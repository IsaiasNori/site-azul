<link rel="stylesheet" href="/assets/css/insert-form.css">

<div id="form-head">
    <h1>Combustível Extra</h1>
    <div id="menu-buttons" >
            <button id="btn-save">Salvar</button>
            <button id="btn-clear">Limpar</button>
            <button id="btn-close" style="width: 1.5rem;">X</button>
    </div>
    <label id="messages">Testando essa caralha</label>
</div>

<form action="/api-xfuel/action.php" method="POST">
    <div class="row">
        <label for="type">Qual o tipo de Informação?</label>
        <select id="type" name="type" field></select>
    </div>
    <div class="row">
        <label for="local">Para qual localidade?</label>
        <select id="local" name="local" field></select>
    </div>
    <div class="row">
        <label for="x-fuel">Quanto tempo de Xfuel?</label>
        <input id="x-fuel" name="x-fuel" type="number" placeholder="Minutos" field required/>
    </div>
    <div class="row">
        <label for="reason">Qual o motivo do Xfuel?</label>
        <select id="reason" name="reason" field></select>
    </div>
    <fieldset><legend>Período</legend>
        <div class="row">
            <label for="start-dt">Inicio:</label>
            <input id="start-dt" name="start-dt" type="date" field required/>
            <select id="start-tm" name="start-tm" field></select>
        </div>
        <div class="row">
            <label for="end-dt">Fim: </label>
            <input id="end-dt" name="end-dt" type="date" field required/>
            <select id="end-tm" name="end-tm" field></select>
        </div>
    </fieldset>
    <fieldset><legend>Informação Adicional:</legend>
        <textarea id="rmk" name="rmk"></textarea>
    </fieldset>
</form>
<script src="/assets/js/insert-form.js"></script>