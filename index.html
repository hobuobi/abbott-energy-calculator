<DOCTYPE! html>

<html>
    <title>Abbott -- Energy Explorer</title>
    <head>
        <meta charset="UTF-8">
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
        <select id="demand" style="position:absolute; top:0px; right:0px">
            <option value="42423">Taipower projection (approx. 2% growth/yr)
 - 42423 MW</option>
            <option value="35707">No change in demand- 35707 MW</option>
            <option value="32950">1% Annual Reduction - 32950 MW</option>
            <option value="30380">2% Annual Reduction - 30380 MW</option>
        </select>
        </div>
        <br>
        <p><i>Select a rate of energy demand growth for the year 2025.</i></p>
        <hr />
        <h2>核電- 台灣有多座核能發電廠, 每一座有2個獨立的反應爐. 請選擇以下營運發電中的反應爐:</h2>
        <hr />
        <label class="toggle">
        <input type="checkbox" class="pplant" id="chinsan1" >
        <div class="toggle">核一金山核能發電廠1號機</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="chinsan2">
        <div class="toggle">核一金山核能發電廠2號機</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="kuosheng1" >
        <div class="toggle">核二國勝核能發電廠1號機</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="kuosheng2" >
        <div class="toggle">核二國勝核能發電廠2號機</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="maanshan1" >
        <div class="toggle">核三馬鞍山核能發電廠1號機</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="maanshan2" >
        <div class="toggle">核三馬鞍山核能發電廠2號機</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="lungmen1" >
        <div class="toggle">核四龍門核能發電廠1號機</div>
        </label>

        <label class="toggle">
        <input type="checkbox" class="pplant" id="lungmen2" >
        <div class="toggle">核四龍門核能發電廠2號機</div>
        </label>

        <h2>SELECT RESOURCE VALUES</h2>
        <p><i>All values are in megawatts.</i></p>
        <hr />
        <h4><i>非再生能源- 用以下的slider去設定每個能源的裝置容量數值</i></h4>
        <div class="slide-holder">
            <div class="slide-title">燃煤</div>
           <input type="range" id="coal">
            <input type="text" class="slide-value" id="coal"></input>
        </div>

        <div class="slide-holder">
            <div class="slide-title">燃油</div>
            <input type="range" id="oil">
            <input type="text" class="slide-value" id="oil"></input>
        </div>

        <div class="slide-holder">
            <div class="slide-title">燃氣</div>
            <input type="range" id="gas">
            <input type="text" class="slide-value" id="gas"></input>
        </div>
        <h4><i>再生能源-用以下的slider去設定每個能源的裝置容量數值</i></h4>
        <div class="slide-holder">
            <div class="slide-title">太陽能光伏發電</div>
            <input type="range" id="solarpv">
            <input type="text" class="slide-value" id="solarpv"></input>
        </div>
        <div class="slide-holder">
            <div class="slide-title">風力</div>
            <input type="range" id="wind">
            <input type="text" class="slide-value" id="wind"></input>
        </div>



    </div>
    <div class="col-md-6" id="container-O">
      <!--
      <select id="situation" style="position:absolute; top:0px; right:0px">
          <option value="2015">2015 Energy Situation</option>
          <option value="taipower">2025 Energy Situation (Taipower Prediction)</option>
          <option value="renewables">2025 Energy Situation (Max Renewables)</option>
          <option value="custom">2025 Energy Situation (Custom Input)</option>
      </select> -->
        <div class="header-label" align="center">
          <p>Select an energy scenario.</p>
          <select id="scenarios">
              <option value="2015">2015 能源狀態</option>
              <option value="taipower">2025 能源狀態 (台電預測資訊)</option>
              <option value="max-ren">2025 能源狀態 (使用者自行輸入資訊)</option>
              <option value="custom" selected="selected">2025, Custom Input</option>
          </select>
        </div>
        <div class="header-label">
          <p><span>發電裝置容量(GW) - 總計</span></p>
          <p><span id="TIC"></span></p>
        </div>
        <div class="col-md-12" align="center">
        <div class="col-md-6">
        <svg id="vis-canvas-supply"></svg>
        </div>
        <div class="col-md-6">
          <table class="data-table">
            <tr>
              <td>備用容量</td>
              <td><span id="RC"></span></td>
            </tr>
            <tr>
              <td>再生能源裝置容量 (%)</td>
              <td><span id="RNC"></span></td>
            </tr>
            <tr>
              <td>非再生能源裝置容量 (%)</td>
              <td><span id="NRNC"></span></td>
            </tr>
          </table>
        </div>
        </div>



        <!-- ELECTRICITY -->

        <div class="header-label"  style="margin-top:15px;">
          <p><span>發電量</span></p>
          <p><span id="EG"></span></p>
        </div>
        <div class="col-md-12" align="center">
        <div class="col-md-6">
        <svg id="vis-canvas-elec"></svg>
        </div>
        <div class="col-md-6">
          <table class="data-table">
            <tr>
              <td>再生能源發電</td>
              <td><span id="RNE"></span></td>
            </tr>
            <tr>
              <td>非再生能源發電</td>
              <td><span id="NRNE"></span></td>
            </tr>
            <tr>
              <td>排放量改變 (千公噸二氧化碳)</td>
              <td><span id="CEC"></span></td>
            </tr>
            <tr>
              <td>排放量目標達成?</td>
              <td><span id="goalsMet"></span></td>
            </tr>
          </table>
        </div>
      </div>


    </div>
</body>

</html>
