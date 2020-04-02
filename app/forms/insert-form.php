<link rel="stylesheet" href="/assets/css/insert-form.css">
<script src="/assets/js/insert-form.js"></script>
<form>
    <div id="form-head">
        <h1>Combustível Extra</h1>
        <div id="menu-buttons" >
            <button id="btn-save">Salvar</button>
            <button id="btn-clear">Limpar</button>
            <button id="btn-close" style="width: 1.5rem;">X</button>
        </div>
        <label id="messages"></label>
    </div>
    <div class="row">
        <label for="type-field">Qual o tipo de Informação? </label>
        <select id="type-field" field size-default><option></option></select>
    </div>
    <div class="row">
        <label for="local-field">Para qual localidade? </label>
        <select id="local-field" field size-default></select>
    </div>
    <div class="row">
        <label for="xfuel-field">Qual o valor em minutos do Xfuel? </label>
        <input id="xfuel-field" type="text" placeholder="00" field size-default>
    </div>
    <div class="row">
        <label for="reason-field">Qual o motivo do Xfuel? </label>
        <select id="reason-field" field size-default><option></option></select>
    </div>
    <div class="row">
        <label>Quando essa informação será exibida? </label><br>
    </div>
    <div class="row">
        <label for="start-date">Inicio: </label>
        <input id="start-date" type="date" field/>
        <select id="start-time" field size-default></select><br>
    </div>
    <div class="row">
        <label for="end-date">Fim: </label>
        <input id="end-date" type="date" field/>
        <select id="end-time" field size-default></select>
    </div>
    <div class="row">
        <label for="rmk-field">Informação Adicional: </label>
        <textarea id="rmk-field" field></textarea>
    </div>
</form>