<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercici 2</title>
</head>
<body>
    <form action="ex2.php" method="post">
        <label for="dep">Selecciona un departament:</label>
        <select name="departament" id="dep">
            <option value="1">Informatica</option>
            <option value="2">Llengua</option>
            <option value="3">Matematiques</option>
            <option value="4">Angles</option>
        </select>
        <input type="submit" value="Enviar">
    </form>

    <?php 
    if($_SERVER["REQUEST_METHOD"] == 'POST' && isset($_POST["departament"])) {
        $dep = intval($_POST["departament"]);                                 
        switch ($dep) {
            case 1:
                echo "<h3>Informatica</h3>";
                echo "<p>El departament d'informàtica té un pressupost de 500 € </p>";
                break;
            case 2:
                echo "<h3>Llengua</h3>";
                echo "<p>El departament de llengua té un pressupost de 300 € </p>";
                break;
            case 3:
                echo "<h3>Matematiques</h3>";
                echo "<p>El departament de matemàtiques té un pressupost de 600 € </p>";
                break;
            case 4:
                echo "<h3>Angles</h3>";
                echo "<p>El departament d'angles té un pressupost de 200 € </p>";
                break;
            default:
                echo "<h3>Departament no trobat</h3>";
                break;
        }
    }
    ?>
</body>
</html>
