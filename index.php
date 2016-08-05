<DOCTYPE! html>

<html>
    <title>Abbott -- Energy Explorer</title>
    <head>
        <!-- CSS -->

        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:300,300i,700" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <link href="css/main.css" rel="stylesheet">
        <link href="css/slider.css" rel="stylesheet">
        <!-- JS -->
        <script src="js/jquery.min.js"></script>
        <script src="js/d3.min.js"></script>
        <script src="js/main.js"></script>

    </head>
<body>
    <div class="col-md-6" id="container-I">
        <div style="position:relative;margin:0px;width:100%">
        <h2>SELECT DEMAND</h2>
        <select style="position:absolute; top:0px; right:0px">
            <option value="42423">Taipower - 42423 MW</option>
            <option value="35707">Net Zero (2015 Levels) - 35707 MW</option>
            <option value="32950">1% YR Reduction - 32950 MW</option>
            <option value="30380">2% YR Reduction - 30380 MW</option>
        </select>
        </div>
        <hr />
        <h2>SELECT POWER PLANTS</h2>
        <hr />
        <label class="toggle">
        <input type="checkbox" class="pplant" id="chinsan1" >
        <div class="toggle">CHINSAN 1</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="chinsan2">
        <div class="toggle">CHINSAN 2</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="kuosheng1" >
        <div class="toggle">KUOSHENG 1</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="kuosheng2" >
        <div class="toggle">KUOSHENG 2</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="maanshan1" >
        <div class="toggle">MAANSHAN 1</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="maanshan2" >
        <div class="toggle">MAANSHAN 2</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="lungmen1" >
        <div class="toggle">LUNGMEN 1</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="lungmen2" >
        <div class="toggle">LUNGMEN 2</div>
        </label>

        <h2>SELECT RESOURCE VALUES</h2>
        <p><i>All values are in megawatts.</i></p>
        <hr />
        <div class="slide-holder">
            <div class="slide-title">COAL</div>
           <input type="range" id="coal">
            <input type="text" class="slide-value" id="coal"></input>
        </div>

        <div class="slide-holder">
            <div class="slide-title">OIL</div>
            <input type="range" id="oil">
            <input type="text" class="slide-value" id="oil"></input>
        </div>

        <div class="slide-holder">
            <div class="slide-title">NATURAL GAS</div>
            <input type="range" id="gas">
            <input type="text" class="slide-value" id="gas"></input>
        </div>

        <div class="slide-holder">
            <div class="slide-title">SOLAR</div>
            <input type="range" id="solarpv">
            <input type="text" class="slide-value" id="solarpv"></input>
        </div>
        <div class="slide-holder">
            <div class="slide-title">WIND</div>
            <input type="range" id="wind">
            <input type="text" class="slide-value" id="wind"></input>
        </div>



    </div>
    <div class="col-md-6" id="container-O">
        <div class="header-label">
          <p><span>TOTAL INSTALLED CAPACITY</span></p>
          <p><span id="TIC"></span></p>
        </div>
        <div class="col-md-12" align="center">
        <div class="col-md-6">
        <svg id="vis-canvas-supply"></svg>
        </div>
        <div class="col-md-6">
          <table class="data-table">
            <tr>
              <td>Reserve Capacity</td>
              <td><span id="RC"></span></td>
            </tr>
            <tr>
              <td>Renewable Capacity</td>
              <td><span id="RNC"></span></td>
            </tr>
            <tr>
              <td>Non-renewable Capacity</td>
              <td><span id="NRNC"></span></td>
            </tr>
          </table>
        </div>
        </div>



        <!-- ELECTRICITY -->

        <div class="header-label"  style="margin-top:15px;">
          <p><span>TOTAL ELECTRICITY</span></p>
          <p><span id="EG"></span></p>
        </div>
        <div class="col-md-12" align="center">
        <div class="col-md-6">
        <svg id="vis-canvas-elec"></svg>
        </div>
        <div class="col-md-6">
          <table class="data-table">
            <tr>
              <td>Renewable Electricity</td>
              <td><span id="RNE"></span></td>
            </tr>
            <tr>
              <td>Non-renewable Electricity</td>
              <td><span id="NRNE"></span></td>
            </tr>
            <tr>
              <td>Carbon Emmissions</td>
              <td><span id="CEC"></span></td>
            </tr>
            <tr>
              <td>Emission Goals Met?</td>
              <td><span id="goalsMet"></span></td>
            </tr>
          </table>
        </div>
      </div>


    </div>
</body>

</html>
