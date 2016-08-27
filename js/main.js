// DATA MODEL

var DATA= [];
var mode = "value";
function NuclearToggle(o,i,v){
    this.position = o;
    this.id = i;
    this.value = v;
    this.capacityFactor = 0.89;
    this.type = ["LC"];
}

function ResourceSlider(min, max, i, val,type,CF){
    this.min = min;
    this.max = max;
    this.id = i;
    this.value = val;
    this.type = type;
    this.capacityFactor = CF;
}

function ResourceConstant(id, val,CF,type){
    this.id = id;
    this.value = val;
    this.capacityFactor = CF;
    this.type = type;
}

var peakInstalledCapacity = 43556;
var demand = 42423;
//NuclearToggle.prototype.getPosition = function() { return this.position; }
//NuclearToggle.prototype.getID = function() { return this.id; }
//NuclearToggle.prototype.getValue = function() { return this.value; }

//Nuclear Toggle Methods
NuclearToggle.prototype.toggle = function() {
    if(this.position == true){
        this.position = false
        findByKey(DATA,this.id).value = 0;
        findByKey(DATA,this.id).electricity = 0;
    }
    else{
        this.position = true
        findByKey(DATA,this.id).value = this.value;
        findByKey(DATA,this.id).electricity = this.getElectricityGenerated();
    }
}
NuclearToggle.prototype.setID = function(x) { this.id = x }
NuclearToggle.prototype.setValue = function(x) { this.value = x }
NuclearToggle.prototype.setElectricityGenerated = function(x) { this.electricity = x }
NuclearToggle.prototype.getElectricityGenerated = function() {
    return (8760*this.value*this.capacityFactor)/1000;
}

//Resource Sliders Methods
ResourceSlider.prototype.setValue = function(x) {
    this.value = x
    findByKey(DATA,this.id).value = this.value;
    findByKey(DATA,this.id).electricity = this.getElectricityGenerated();
    }
ResourceSlider.prototype.getElectricityGenerated = function() {
    return (8760*this.value*this.capacityFactor)/1000;
}

ResourceConstant.prototype.getElectricityGenerated = function() {
    return (8760*this.value*this.capacityFactor)/1000;
}

var nucToggles = {
    "chinsan1": new NuclearToggle(false,"chinsan1",636),
    "chinsan2": new NuclearToggle(false,"chinsan2",636),
    "kuosheng1": new NuclearToggle(false,"kuosheng1",985),
    "kuosheng2": new NuclearToggle(false,"kuosheng2",985),
    "maanshan1": new NuclearToggle(false,"maanshan1",951),
    "maanshan2": new NuclearToggle(false,"maanshan2",951),
    "lungmen1": new NuclearToggle(false,"lungmen1",1350),
    "lungmen2": new NuclearToggle(false,"lungmen2",1350)

}
var resourceSliders = {
    "solarpv": new ResourceSlider(669,20000,"solarpv", 669,["LC","R"],.13),
    "wind": new ResourceSlider(652, 4000, "wind", 652,["LC","R"],.3),
    "coal": new ResourceSlider(0,15297,"coal", 10697,["FF"],.84),
    "oil": new ResourceSlider(0, 3325, "oil", 3325,["FF"],.21),
    "gas": new ResourceSlider(0,26090, "gas", 15244,["FF"],.52)
}
var constants = {
    "biogas": new ResourceConstant("biogas", 623,.65,["R"]),
    "hydrostorage": new ResourceConstant("hydrostorage",2602,1.0,["LC","R"]),
    "hydropower": new ResourceConstant("hydropower", 2102,.28,["LC", "R"]),
    "geothermal": new ResourceConstant("geothermal", 50,0,["LC", "R"])
}
for(var item in nucToggles){
    DATA.push({
        "name" : nucToggles[item].id,
        "value": nucToggles[item].position == true ? nucToggles[item].value : 0,
        "electricity": nucToggles[item].position == true ? nucToggles[item].getElectricityGenerated() : 0,
        "type": nucToggles[item].type
    });
}
for(var item in resourceSliders){
    DATA.push({
        "name" : resourceSliders[item].id,
        "value": resourceSliders[item].value,
        "electricity": resourceSliders[item].getElectricityGenerated(),
        "type": resourceSliders[item].type
    });
}
for(var item in constants){
    DATA.push({
        "name" : constants[item].id,
        "value": constants[item].value,
        "electricity": constants[item].getElectricityGenerated(),
        "type": constants[item].type
    });
}
function COMP_totalInstalledCapacity(){
    var TOTAL = 0;
    for(var item in nucToggles)
    {
        var tempItem = nucToggles[item]
        if(tempItem.position == true){
            TOTAL+=tempItem.value;
        }
    }
    for(var item in resourceSliders)
    {
        var tempItem = resourceSliders[item];
        TOTAL+=tempItem.value;

    }
    for(var item in constants)
    {
        var tempItem = constants[item];
        TOTAL+=tempItem.value;
    }

    return TOTAL;
}
function COMP_totalInstalledCapacityType(x){
    var TOTAL = 0;
    for(var item in nucToggles){
        var tempItem = nucToggles[item]
        if(tempItem.position == true && arrContains(tempItem.type,x)){
            TOTAL += tempItem.value;
        }
    }
    for(var item in resourceSliders){
        var tempItem = resourceSliders[item]
        if(arrContains(tempItem.type,x)){
            TOTAL += tempItem.value;
        }
    }
    for(var item in constants){
        var tempItem = constants[item]
        if(arrContains(tempItem.type,x)){
            TOTAL += tempItem.value;
        }
    }

    return TOTAL;

}
function COMP_reserveCapacity(){

    var SUPPLY = COMP_totalInstalledCapacity()-resourceSliders["solarpv"].value-resourceSliders["wind"].value;
    var DEMAND = demand;

    return (SUPPLY-DEMAND)/DEMAND;
}


function truncateDecimals (num, digits) {
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    return parseFloat(finalResult);
}

function findByKey(array,key){
    for(var x in array)
    {
        if(array[x].name == key){ return array[x]}
    }
    return null;
}
function arrContains(array,value){
    return array.indexOf(value) != -1 ? true : false;
}
function getNumber(str){
    var result = "";
    for(var i=0; i<str.length; i++){
      if(str[i] >= 48 || str[i] <= 57){
        result = result.concat(str[i]);
      }
    }
    return +result;
}

function COMP_electricityGenerated(){
    var TOTAL = 0;
    for(var item in nucToggles){
        var tempItem = nucToggles[item]
        if(tempItem.position == true){
            TOTAL += tempItem.getElectricityGenerated();
        }
    }
    for(var item in resourceSliders){
        var tempItem = resourceSliders[item]
        TOTAL+= tempItem.getElectricityGenerated();
    }
    for(var item in constants){
        var tempItem = constants[item]
        TOTAL+= tempItem.getElectricityGenerated();
    }

    return TOTAL;

}
function COMP_electricityGeneratedType(x){
    var TOTAL = 0;
    for(var item in nucToggles){
        var tempItem = nucToggles[item]
        if(tempItem.position == true && arrContains(tempItem.type,x)){
            TOTAL += tempItem.getElectricityGenerated();
        }
    }
    for(var item in resourceSliders){
        var tempItem = resourceSliders[item]
        if(arrContains(tempItem.type,x)){
            TOTAL += tempItem.getElectricityGenerated();
        }
    }
    for(var item in constants){
        var tempItem = constants[item]
        if(arrContains(tempItem.type,x)){
            TOTAL += tempItem.getElectricityGenerated();
        }
    }

    return TOTAL;

}

function COMP_cecCoal(){ return (resourceSliders["coal"].getElectricityGenerated()-78713540)*.0008 }
function COMP_cecNaturalGas(){ return (resourceSliders["gas"].getElectricityGenerated()-70779352)*.0003 }

$(document).ready(function(){
    var default_id = "____";
    var default_value = "____";
    var default_id_2 = "____";
    var default_value_2 = "____";
    applyToSliders(resourceSliders);
    applyToToggles(nucToggles);
    function alert(id){
      if(!$(".alert").length){
        $("body").append("<div class='alert'>Please enter a value between "+resourceSliders[id].min+" and "+resourceSliders[id].max+".</div>");
        $(".alert").click(function(){
          console.log('clickity');$(this).remove();
        });
      }
      else{ $(".alert").text("Please enter a value between "+resourceSliders[id].min+" and "+resourceSliders[id].max+".")}
    }

    $("#demand").change(function(){
        demand = +($(this).val());
        COMP();
    })
    $("#situation").change(function(){

    });
    $("input.pplant:checkbox").change(function() {
        var id = $(this).attr("id");
        nucToggles[id].toggle();
        nucToggles[id].setElectricityGenerated();
        COMP();
        if(id == default_id){
            default_value= item[mode]+" ("+truncateDecimals(item[mode]*100/COMP_sum(mode),2)+"%)"
            $("#detail-name").text(item.name.toUpperCase());
            $("#detail-value").text(default_value);
        }
        updateVisualization();
    })

    $("input[type=range]").mousedown(function() {
        $("input[type=range]").mousemove(function(){
            var id = $(this).attr("id");
            var val = document.getElementById(id).value
            resourceSliders[id].setValue(+val);
            $(this).next().val(val+" MW");

            if(id == default_id)
            {
                var item = findByKey(DATA,id)
                default_value = item[mode]+" ("+truncateDecimals(item[mode]*100/COMP_totalInstalledCapacity(),2)+"%)";
                $("#detail-name").text(item.name.toUpperCase());
                $("#detail-value").text(function(){
                    return item.value+" ("+truncateDecimals(item.value*100/COMP_totalInstalledCapacity(),2)+"%)"
                });
            }
            if(id == default_id_2)
            {
                var item = findByKey(DATA,id)
                default_value_2 = truncateDecimals(item.electricity,0)+" ("+truncateDecimals(item.electricity*100/COMP_electricityGenerated(),2)+"%)";
                $("#detail-name-elec").text(item.name.toUpperCase());
                $("#detail-elec").text(default_value_2);
            }
            $("#CEC").text(Math.round(COMP_cecCoal()+COMP_cecNaturalGas()));
            COMP();
            updateVisualization();
        })
    })
    $("input[type=text]").focus(function(){
      var defaultValue = $(this).val();
      $(this).keypress(function(e){
        if(e.which == 13)
        {
          var id = $(this).attr("id");
          var val = getNumber($(this).val());
          if(val != 0 && val >= resourceSliders[id].min && val <= resourceSliders[id].max){
            $(this).val(val+" MW")
            resourceSliders[id].setValue(val);
            $(this).prev().val(val);

            if(id == default_id)
            {
                var item = findByKey(DATA,id)
                default_value = item[mode]+" ("+truncateDecimals(item[mode]*100/COMP_totalInstalledCapacity(),2)+"%)";
                $("#detail-name").text(item.name.toUpperCase());
                $("#detail-value").text(default_value);
            }
            if(id == default_id_2)
            {
                var item = findByKey(DATA,id)
                default_value_2 = truncateDecimals(item.electricity,0)+" ("+truncateDecimals(item.electricity*100/COMP_electricityGenerated(),2)+"%)";
                $("#detail-name-elec").text(item.name.toUpperCase());
                $("#detail-elec").text(default_value_2);
            }
            $("#CEC").text(Math.round(COMP_cecCoal()+COMP_cecNaturalGas()));
            COMP();
            updateVisualization();
          }
          else{ alert(id); $(this).val(defaultValue)}
        }

      })
    })
    $("input[type=range]").mouseup(updateVisualization)
    $("#CEC").text(Math.round(COMP_cecCoal()+COMP_cecNaturalGas()));
    $("#scenarios").change(function(){
      switch($(this).val()){
        case '2015': applyScenario("41.0 GW","11.3%","8.2%","91.8%","6.2%","93.8","219013.9 GWH","-0.029","否",false);
        break;
        case 'taipower': applyScenario("46.6 GW","3.6%","10.3%","89.7%","4.0%","96.0%","225668.0 GWH","36249 kT CO2","否",false);
        break;
        case 'max-ren': applyScenario("68.0 GW","33.4%","38.5%","61.5%","15.7%","84.3","256928.0 GWH","36249.4","否",false);
        break;
        case 'custom': applyScenario("41.0 GW","11.3%","8.2%","91.8%","6.2%","93.8","219013.9 GWH","-0.029","否",true);
        break;
      }
    })
    function applyScenario(tic,rc,rnc,nrnc,rne,nrne,eg,cec,gm,active){
      console.log(active);
      $("#TIC").text(tic);
      $("#RC").text(rc);
      $("#RNC").text(rnc);
      $("#NRNC").text(nrnc);
      $("#RNE").text(rne);
      $("#NRNE").text(nrne);
      $("#EG").text(eg);
      $("#CEC").text(cec);
      $("#goalsMet").text(gm);
      if(active == false){
        $("#container-I").css('opacity',0.1);
        $("input").prop("disabled",true);
      }
      else{
        $("#container-I").css('opacity',1);
        $("input").removeProp("disabled");
      }
    }
    function COMP(){
        $("#TIC").text(truncateDecimals(COMP_totalInstalledCapacity()/1000,1)+" GW");
        $("#RC").text(truncateDecimals(COMP_reserveCapacity()*100,2)+"%");
        $("#RNC").text(truncateDecimals(COMP_totalInstalledCapacityType("R")/COMP_totalInstalledCapacity()*100,2)+"%");
        $("#NRNC").text(truncateDecimals((1-COMP_totalInstalledCapacityType("R")/COMP_totalInstalledCapacity())*100,2)+"%");
        $("#RNE").text(truncateDecimals(COMP_electricityGeneratedType("R")/COMP_electricityGenerated()*100,2)+"%");
        $("#NRNE").text(truncateDecimals((1-COMP_electricityGeneratedType("R")/COMP_electricityGenerated())*100,2)+"%");
        $("#EG").text(Math.round(COMP_electricityGenerated())+" GWH");
        $("#CEC").text(Math.round(COMP_cecCoal()+COMP_cecNaturalGas()));
        $("#goalsMet").text(function(){
          if(COMP_cecCoal()+COMP_cecNaturalGas() < 38082)
          {
            $(this).attr("color","green"); return "是";
          }
          else
          {
            $(this).attr("color","red"); return "否";
          }
        });
    }

    function applyToSliders(sliderObj){
        for(var key in sliderObj){
            $("#"+key).attr("min", sliderObj[key].min);
            $("#"+key).attr("max", sliderObj[key].max);
            document.getElementById(key).defaultValue = sliderObj[key].value;
            $("#"+key).attr("val", sliderObj[key].value);
            $("#"+key).next().val(sliderObj[key].value+" MW")
            COMP();
        }
    }
    function applyToToggles(toggleObj){
      for(var key in toggleObj){
        $("#"+key).prop("checked",toggleObj[key].position);
        findByKey(DATA,key).value = nucToggles[key].position == true ? nucToggles[key].value : 0;
        }
      }

    var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;


    var color = d3.scale.ordinal(["#CCC","royalblue","green","teal"])
        .range(["#555","royalblue","green","teal"])
        .domain([["FF"],["LC"],["R"],["LC","R"]])

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius/2);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });
    var pie_elec = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.electricity; });
    var svg = d3.select("#vis-canvas-supply")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var svg_elec = d3.select("#vis-canvas-elec")
      .attr("width",width)
      .attr("height",height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    console.log("UPDATING");
    var g = svg.selectAll(".arc")
        .data(pie(DATA))
        .attr("class", "arc");
    var g_elec = svg_elec.selectAll(".arc")
        .data(pie_elec(DATA))
        .attr("class","arc");
    var label = svg.append("text")
      .attr("id","detail-value")
      .attr("text-anchor","middle")
      .attr("y",17);
    var labelname = svg.append("text")
      .attr("id","detail-name")
      .attr("text-anchor","middle")
      .attr("y",0);
    var label_elec = svg_elec.append("text")
      .attr("id","detail-elec")
      .attr("text-anchor","middle")
      .attr("y",17);
    var labelnameelec = svg_elec.append("text")
      .attr("id","detail-name-elec")
      .attr("text-anchor","middle")
      .attr("y",0);
    g.enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            return color(d.data.type); })
        .style("stroke", "white");
    g_elec.enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            return color(d.data.type); })
        .style("stroke", "white");
    function total(){
        var total = 0;
        for(var x in DATA){ total += x[mode] }
        return total;
    }
    g
        .on("mouseover", function(d){
            d3.select(this).transition().duration(300).attr('opacity',0.5);
            $("#detail-name").text(d.data.name.toUpperCase());
            $("#detail-value").text((d.data).value+" ("+truncateDecimals(d.data.value*100/COMP_totalInstalledCapacity(),2)+"%)");
            $(".detail-label").css("border-left-color",color(d.data.type))
        })
        .on("mouseout", function(d){
            d3.select(this).transition().duration(300).attr('opacity',1);
            $("#detail-name").text(default_id.toUpperCase());
            $("#detail-value").text(default_value);
        })
        .on("click", function(d){
            default_id= d.data.name;
            default_value = d.data[mode]+" ("+truncateDecimals(d.data[mode]*100/COMP_totalInstalledCapacity(),2)+"%)"
        })

    g_elec
        .on("mouseover", function(d){
            d3.select(this).transition().duration(200).attr('opacity',0.5);
            $("#detail-name-elec").text(d.data.name.toUpperCase());
            $("#detail-elec").text(function(){
                return truncateDecimals(d.data.electricity,0)+" ("+truncateDecimals(d.data.electricity*100/COMP_electricityGenerated(),2)+"%)"
            });
            $(".detail-label").css("border-left-color",color(d.data.type))
        })
        .on("mouseout", function(d){
            d3.select(this).transition().duration(200).attr('opacity',1);
            $("#detail-name-elec").text(default_id_2.toUpperCase());
            $("#detail-elec").text(default_value_2);
        })
        .on("click", function(d){
            default_id_2= d.data.name;
            default_value_2 = truncateDecimals(d.data.electricity,0)+" ("+truncateDecimals(d.data.electricity*100/COMP_electricityGenerated(),2)+"%)"
        })
    function toggle(){

        if(mode == "value")
        {
            mode = "electricity"
        }
        else{
            mode = "value"
        }
    }
function updateVisualization(){
    pie.value(function(d) { return d.value})
    g.data(pie(DATA))
    g.transition().duration(500)
            .attr("d", arc)

    pie_elec.value(function(d) { return d.electricity})
    g_elec.data(pie_elec(DATA))
    g_elec.transition().duration(500)
            .attr("d", arc)
}

 });
