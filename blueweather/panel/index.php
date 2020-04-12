<!DOCTYPE html>

<html lang="pt-BR">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="refresh" content="120"/>
		<link rel="stylesheet" href="/assets/css/panel.css">
		<script src="/assets/common/date/date-format.js"></script>
		<script src="/assets/common/jquery/jquery-3.4.1.min.js"></script>
		<title>Panel X-Fuel</title>
	</head>

	<body>
		<header class="other-border">
			<div class="div-in-header">
				<div id="title-header">
					<h1>Bl<font color="#5F87FF">u</font>e Weather</h1>
				</div>
			</div>

			<div class="div-in-header">
				<div id="middle-header">
					<h2>Extra Fuel Aplicado</h2>

					<div id="update-div">
						Atualizado em:
						<?php	
							date_default_timezone_set('UTC');
							print date('d-m-Y - H:i');
						?>
					</div>
				</div>
			</div>

			<div class="div-in-header">
				<div id="legend-header">
					<span class="span-reason wxx-border">WXX</span>
					<span class="span-reason atc-border">ATC</span>
					<span class="span-reason other-border">OUTROS</span>
				</div>
			</div>
		</header>

		<div id="content">
			<div id="north" class="div-block">
				<div class="div-region-title">NORTE</div>
			</div>

			<div id="northeast" class="div-block">
				<div class="div-region-title">NORDESTE</div>
			</div>
			
			<div id="midwest" class="div-block">
				<div class="div-region-title">CENTRO</div>
			</div>
			
			<div id="southeast" class="div-block">
				<div class="div-region-title">SUDESTE</div>
			</div>
			
			<div id="south" class="div-block">
				<div class="div-region-title">SUL</div>
			</div>
			
			<div id="tma" class="div-block">
				<div class="div-region-title">TMA</div>
			</div>
		</div>

		<div id="info-content">
			<div class="div-infoadd">
				<!-- implementar no view funcao para renderizar aqui -->
			</div>

			<div class="div-infoadd"></div>
		</div>
		
		<script src="/assets/js/panel.js"></script>
	</body>
<html>