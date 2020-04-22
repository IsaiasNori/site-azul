<link rel="stylesheet" href="assets/css/insert-form.css">

<div id="content-form">
    <form method="POST">
        <div id="form-head">
            <h1>Combustível Extra</h1>
            <div id="menu-buttons">
                <button type="submit" id="btn-save">Salvar</button>
                <button id="btn-clear">Limpar</button>
                <button id="btn-close" style="width: 1.5rem;">X</button>
            </div>
        </div>
        <div id="form-body">
            <div class="row">
                <label for="type">Qual o tipo de Informação?</label>
                <select id="type" name="type" field required></select>
            </div>
            <div class="row">
                <label for="region">Defina a região ou TMA</label>
                <select id="region" name="region" field></select>
            </div>
            <div class="row">
                <label for="local">Para qual localidade?</label>
                <select id="local" name="local" field></select>
            </div>
            <div class="row">
                <label for="xfuel_value">Quanto tempo de Xfuel?</label>
                <input id="xfuel_value" name="xfuel_value" type="number" min="0" placeholder="minutos" field />
            </div>
            <div class="row">
                <label for="reason">Qual o motivo do Xfuel?</label>
                <select id="reason" name="reason" field></select>
            </div>
            <fieldset>
                <legend>Período</legend>
                <div class="row">
                    <label id="start" for="start-dt">Inicio(UTC)</label>
                    <input id="start-dt" name="start-dt" type="date" field required />
                    <select id="start-tm" name="start-tm" field></select>
                </div>
                <div class="row">
                    <label id="end" for="end-dt">Fim(UTC)</label>
                    <input id="end-dt" name="end-dt" type="date" field required />
                    <select id="end-tm" name="end-tm" field></select>
                </div>
            </fieldset>
            <fieldset>
                <legend>Informação Adicional:</legend>
                <textarea id="remark" name="remark"></textarea>
            </fieldset>
        </div>
    </form>
</div>
<script src="assets/js/insert-form.js"></script>