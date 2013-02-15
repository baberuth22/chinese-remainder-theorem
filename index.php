<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
	<title>Chinese Remainder Theorem</title>
	<meta name="description" content="" />
  	<meta name="keywords" content="" />
	<meta name="robots" content="" />
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js" type="text/javascript"></script>
	<script src="js/bootstrap.min.js" type="text/javascript"></script>

	<link href="index.less" title="LESS" rel="stylesheet/less" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="css/bootstrap.min.css" title="Boostrap CSS" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="css/toastr.css" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="css/bootstrap-responsive.css" title="Boostrap Responsive CSS" type="text/css" media="screen" charset="utf-8">
	<script src="js/less-1.3.1.min.js" type="text/javascript"></script>
</head>
<body>
<div id="container" class="container">
	<header class="span12">
		<h3>
			<a href="http://en.wikipedia.org/wiki/Chinese_remainder_theorem" target="_blank">Chinese Remainder Theorem</a>
		</h3>
	</header>

	<!--
	<form action="javascript:calculate()">
			<div id="entry_form">
					x =
					<input type="text" data-bind="value: remainder" class="remainder-txt input-mini" name="remainder" />
					mod
					<input type="text" data-bind="value: mod" class="mod-txt input-mini" name="mod" />
			</div>
			<input  type="button" class="add-btn btn-success" value="Add Congruence" onclick="add_congruence();"/>
			<input type="submit" value="Calculate" class="btn-danger"><br><br>
			Solution
			<input type="text" id="solution" size="10">
	</form>

	<p>Remainder: <strong data-bind="text: remainder"></strong></p>
	<p>Mod: <strong data-bind="text: mod"></strong></p>

	<br><br>
	-->

	<div class="span12">
		<div class="span6">
			<table class="table">
				<caption><h4>Congruences</h4></caption>
			    <thead>
				    <tr>
				    	<th></th>
				        <th>Remainder</th>
				        <th></th>
				        <th>Mod</th>
				    </tr>
			    </thead>
			    <!-- Todo: Generate table body -->
			    <tbody data-bind="foreach: congs">
				     <tr>
				     	<td>Z &equiv; </td>
				        <td><input class="remainder-txt input-mini required number" data-bind="value: remainder"/></td>
				        <td>( mod </td>
				        <td><input class="mod-txt input-mini required number" data-bind="value: mod"/></td>
				        <td>) </td>
				        <td><a href="#" data-bind="click: $root.removeCong">Remove</a></td>
				    </tr>
			    </tbody>
			</table>
			<h3 data-bind="visible: answer() > 0">
			    Z = <span data-bind="text: answer"></span>
			</h3>
			<h4 data-bind="visible: answer() == 0">
			    <span class="label label-warning">No Solution</span>
			</h4>



			<h5>
			    Least Common Multiple: <span data-bind="text: lcm"></span>
			</h5>
			<input data-bind="click: addCong"  type="button" class="add-btn btn-success" value="Add Congruence" />
		</div>
		<div class="span5"><blockquote cite="http://mathworld.wolfram.com/ChineseRemainderTheorem.html">
Let R and S be positive integers which are relatively prime and let A and B be any two integers. Then there is an integer N such that <img src="eqa.gif"/> and <img src="eqb.gif"/> </blockquote>
</div>
	</div>
	<div id="chartDiv" class="span12" style="min-width: 400px; height: 300px; margin: 0 auto"></div>
	<div id="scatterDiv" class="span12" style=" height: 150px; margin: 0 auto"></div>





</div>



<footer>
	<div class="pull-right" style="margin:30px;color:#444444">Bryan Saltzman - 2013</div>
	<script src="js/toastr.js" type="text/javascript"></script>
	<script src="js/knockout-2.2.1.js" type="text/javascript"></script>
	<script src="js/Highcharts-2.3.5/js/highcharts.js" type="text/javascript"></script>
	<script src="index.js" type="text/javascript"></script>

</footer>

</body>
</html>
