<?php

?>
<style>
    form {
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 300px;
        margin-left: 500px;
    }
</style>

<form action="xfuel.php" method="post">
    <label for="type">type</label>
    <input type="text" name="type" id="type">
    <label for="region">region</label>
    <input type="text" name="region" id="region">
    <label for="local">local</label>
    <input type="text" name="local" id="local">
    <label for="xfuel_value">xfuel</label>
    <input type="text" name="xfuel_value" id="xfuel_value">
    <label for="reason">reason</label>
    <input type="text" name="reason" id="reason">
    <label for="date_start">date_start</label>
    <input type="text" name="date_start" id="date_start">
    <label for="date_end">date_end</label>
    <input type="text" name="date_end" id="date_end">
    <label for="remark">remark</label>
    <input type="text" name="remark" id="remark">
    <input type="submit" value="enviar">
</form>