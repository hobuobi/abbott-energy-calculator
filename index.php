<DOCTYPE! html>
    
<html>
    <title>CALCULATOR TEST</title>
    <head>
        <!-- CSS -->
        
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:300,300i,700" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/main.css" rel="stylesheet">
        
        <!-- JS -->
        <script src="js/jquery.min.js"></script>
        <script src="js/d3.min.js"></script>
        <script src="js/main.js"></script>
        
    </head>
<body>
    <div id="header" align="center">
        <img id="logo" src="images/logo.png">
    </div>
    <div class="col-md-6" id="container-I">
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
            <div class="slide-value">VALUE</div>
        </div>
        
        <div class="slide-holder">
            <div class="slide-title">OIL</div>
            <input type="range" id="oil">
            <div class="slide-value">VALUE</div>
        </div>
        
        <div class="slide-holder">
            <div class="slide-title">NATURAL GAS</div>
            <input type="range" id="gas">
            <div class="slide-value">VALUE</div>
        </div>
        
        <div class="slide-holder">
            <div class="slide-title">SOLAR</div>
            <input type="range" id="solarpv">
            <div class="slide-value">VALUE</div>
        </div>
        <div class="slide-holder">
            <div class="slide-title">WIND</div>
            <input type="range" id="wind">
            <div class="slide-value">VALUE</div>
        </div>
        
        
        
    </div>
    <div class="col-md-6" id="container-O">

        <input type="checkbox" class="data-switch">Electricity Generated?

        <h1>TOTAL INSTALLED CAPACITY: <span id="TIC"></span></h1>
        <h2>RESERVE CAPACITY: <span id="RC"></span></h2>
        <h2>ELECTRICITY GENERATED: <span id="EG"></span></h2>
        <svg id="vis-canvas"></svg>
        <div class="detail-label">
            <span id="detail-name">SELECT A SEGMENT</span>
            <span id="detail-value">_____</span>
        </div>
    </div>   
</body>
    
</html>
    
    