<!DOCTYPE html>

<html lang="pt-BR">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="refresh" content="120" />
	<link rel="stylesheet" href="./assets/css/panel.css">
	<script src="./assets/lib/date/date-format.js"></script>
	<script src="./assets/lib/jquery/jquery-3.4.1.min.js"></script>
	<title>Panel BlueWeather</title>
</head>

<body>
	<header class="other-border">
		<div>
			<h1>Bl<font color="#5F87FF">u</font>e Weather</h1>
		</div>
		<div>
			<h2>Extra Fuel Aplicado</h2>
			<h4><?php print date('H:i,  M d'); ?></h4>
		</div>
		<div>
			<span class="reason wxx-border">WXX</span>
			<span class="reason atc-border">ATC</span>
			<span class="reason other-border">OUTROS</span>
		</div>
	</header>

	<main id="main">
		<div class="region">
			<h4 class="region-name">NORTE</h4>
			<div id="north" class="block"></div>
		</div>

		<div class="region">
			<h4 class="region-name">NORDESTE</h4>
			<div id="northeast" class="block"></div>
		</div>

		<div class="region">
			<h4 class="region-name">CENTRO</h4>
			<div id="midwest" class="block"></div>
		</div>

		<div class="region">
			<h4 class="region-name">SUDESTE</h4>
			<div id="southeast" class="block"></div>
		</div>

		<div class="region">
			<h4 class="region-name">SUL</h4>
			<div id="south" class="block"></div>
		</div>

		<div class="region">
			<h4 class="region-name">TMA</h4>
			<div id="tma" class="block"></div>
		</div>
	</main>

	<footer></footer>

	<script src="./assets/js/panel.js"></script>
</body>
<html>