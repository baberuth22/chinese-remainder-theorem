
var chart;
var series_array = [{
                name: 'Placehold',
                data: [5, 3, 4, 7, 2]
            }];


var scatter_series_array = [{
                name: 'Female',
                color: 'rgba(223, 83, 83, .5)',
                data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                    [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                    [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                    [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                    [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                    [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]

            }];


$(document).ready(function() {

    toastMessageFromClass('.error-box','error', 'toast-bottom-left');
/*     toastMessageFromClass('.error','error', 'toast-bottom-left'); */
    toastMessageFromClass('.notice-box','warning', 'toast-bottom-right');
    toastMessageFromClass('.success-box','success', 'toast-top-right');


     ko.applyBindings(new CongViewModel());
     //buildChart();
     //buildScatterChart();
});

function buildScatterChart(){

	chart = new Highcharts.Chart({
            chart: {
                renderTo: 'scatterDiv',
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Distributed Values'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: ' '
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true,
                min: 0,
                max: 100
            },
            yAxis: {
                title: {
                    text: 'Solutions'
                },
                min: 0,
                labels:{
                            style: {
								color: '#FFFFFF',
								fontWeight: 'bold'
							}
                }
            },
            tooltip: {
                formatter: function() {
                        return this.x;
                }
            },
            legend: {
            	enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 30,
                floating: true,
                backgroundColor: '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: scatter_series_array
        });

}

function buildChart(){
	chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chartDiv',
                type: 'column'
            },
            title: {
                text: 'Stacked Remainders by Congruence'
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Remainders'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            xAxis:{
	            min:0,
	            max:100
            },
           legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 60,
                y: 20,
                floating: true,
                backgroundColor: '#FFFFFF',
                borderWidth: 1
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y +'<br/>'+
                        'Total: '+ this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: series_array
        });
}


// Class to represent a row in the seat reservations grid
function Cong(thisRemainder, thisMod) {

    var self = this;
    self.remainder = ko.observable(thisRemainder);
    self.mod = ko.observable(thisMod);

//    self.remainder = thisRemainder;
//    self.mod = thisMod;
}

// Overall viewmodel for this screen, along with initial state
function CongViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
/*
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];
*/

//	this.remainder = ko.observable("2");
//    this.mod = ko.observable("5");


	self.congs = ko.observableArray([
    	new Cong(1, 2),
    	new Cong(2, 3)
    ]);

    self.addCong = function() {
    	//var myMod = getRandom(3, 8) * 2 + 1;  // odd number
    	var primeArray = [5,7,11,13,17,19,23,29];
    	var myIndex = getRandom(0, (primeArray.length - 1) );  // odd number
    	var myMod = primeArray[myIndex];
    	var myRemain = getRandom(0, 4);  // odd number
    	toastr.warning(0 + " mod " + myMod + " added");
        self.congs.push(new Cong(myRemain, myMod));
    }
    self.removeCong = function(cong) {
    	toastr.warning(cong.remainder() + " mod " + cong.mod() + " removed");
    	self.congs.remove(cong);
    }

    self.lcm = ko.computed(function() {
	   var mod_array = [];
	   var remainder_array = [];
	   var count = self.congs().length;
	   var myLcm = 1;
	   if(count){
		   for (var i = 0; i < count; i++){
		   		var thisMod = self.congs()[i].mod();
		   		myLcm = lcm(myLcm,thisMod);
		   	}
		}
		return myLcm;
	});



	self.answer = ko.computed(function() {
	   var mod_array = [];
	   var remainder_array = [];
	   var count = self.congs().length;

	   if(count){

	   	   series_array = new Array();
	   	   scatter_series_array = new Array();

		   for (var i = 0; i < count; i++){
		   		var thisMod = self.congs()[i].mod();
		   		var thisRemainder = self.congs()[i].remainder();
		   		if(thisMod == 0){
			   		toastr.error(thisRemainder + " mod " + thisMod + " error!  Cannot mod zero");
		   		}
		   		mod_array[i] = thisMod;
		   		remainder_array[i] = thisRemainder;

		   		// Build our series here for the chart
		   		var thisSeries = new Object();
		   		var thisScatterSeries = new Object();

		   		thisSeries.name = thisRemainder + " mod " + thisMod;
		   		thisScatterSeries.name = thisSeries.name;

		   		var thisSeriesData = new Array();
		   		var thisScatterSeriesData = new Array();

		   		for(var k = 0; k < 100; k++){
			   		var toAdd = (k - thisRemainder ) % thisMod;
			   		thisSeriesData[k] = toAdd;
			   	}

		   		var realVal = 0;
		   		for(var k = 0; realVal <= 100; k++){
			   		var toAddScatter = k * thisMod + thisRemainder;
			   		thisScatterSeriesData[k] = [toAddScatter, i];
			   		realVal = toAddScatter;
		   		}


		   		thisSeries.data = thisSeriesData;
		   		thisScatterSeries.data = thisScatterSeriesData;
		   		//thisSeries.color = '#333333';

		   		series_array[i] = thisSeries;
		   		scatter_series_array[i] = thisScatterSeries;

		   }

		   buildChart();
		   buildScatterChart();
	   	   var thisMult = mod_array[0];
	   	   var thisRemain = remainder_array[0];
	   	   for(var j = 0; j < 100000; j++){
			   var match = true;
			   var testNum = thisMult * j + thisRemain;
			   for(var k = 1; k < count && match; k++){
			   	   var congRemainder = parseInt(testNum % mod_array[k] - remainder_array[k]);
				   if( congRemainder == 0){
					   match = true;
				   }else{
					   match = false;
				   }
			   }

			   if(match && testNum > 0){
			   toastr.success("<b><span style='font-size:30px'>" + testNum + " </span></b>is the first solution greater than zero");
				   return testNum;
			   }
		   }
	   }
	   toastr.error("System of congruences was not solved");
	   return 0;
	});

	    /*
self.answer = ko.computed(function() {
	   var thisAnswer = 0;
	   var modMult = 1;
	   var e = new Array ();
	   var tmp;
	   var x = 0;
	   var count = self.congs().length;
	   for (var i = 0; i < count; i++){
		   modMult *= parseInt( self.congs()[i].mod);
	   }

	   for (var i = 0; i < count; i++){
	   		var thisMod = self.congs()[i].mod;
	   		tmp = extended_gcd(thisMod, modMult/thisMod);
	   		e[i] = tmp[1]*modMult/thisMod;
	   }



	   for (i=0; i<count; i++) {
	   		var thisRemainder = self.congs()[i].remainder;
			x += e[i]*thisRemainder;
	   }

	   if (x >= modMult) {
			x = x % modMult;
		}

		while (x < 0) {
			x = x + modMult;
		}

	   thisAnswer = x;

	   return thisAnswer;
	});
*/



}

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}



/*
 * Returns the GCD of the given integers. Each input must be non-negative.
 */
function gcd(x, y) {
	while (y != 0) {
		var z = x % y;
		x = y;
		y = z;
	}
	return x;
}


/*
 * Tests whether the given string represents an integer.
 */
function isInteger(str) {
	return /^-?\d+$/.test(str);
}


function lcm(t1,t2){
  var cm=1;
  var f=gcd(t1,t2);
  cm=t1*t2/f;
  return cm;
}


function add_congruence(){

	// toastr.warning("we should add now");
}

function extended_gcd(a,b) {
			if (a%b==0) {
				var temp = new Array(0,1);
				return temp;
			} else {
				var temp = extended_gcd(b,a%b);
				var temp2 = new Array(temp[1], temp[0]-temp[1]*(Math.floor(a/b)));
				return temp2;
			}
}



var toastMessageFromClass = function(className, toastType, position){
	var $noticebox = $(className);
    if($noticebox.length){
    	var message = $noticebox.html();
    	$noticebox.html('');
	    var delay = function(ms, func) {
		    return setTimeout(func, ms);
	  };

	  toastr.options = {
	    positionClass: position
	  };

	  delay(500, function() {
	    if(toastType == 'warning'){
			return toastr.warning(message);
	    }else if(toastType == 'success'){
	    	return toastr.success(message);
	    }if(toastType == 'error'){
	    	return toastr.error(message);
	    }

	  });
    }
}
