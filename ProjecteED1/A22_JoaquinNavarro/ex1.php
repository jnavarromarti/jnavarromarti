<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercici 1</title>
</head>
<body>
    <form action="ex1.php" method="post">
        <label for="num">Introdueix un numero:</label>
        <input type="number" name="num" id="num" required>
        <input type="submit" value="Generar tabla">
    </form>

    <?php 
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST["num"])) {
        $num = intval($_POST["num"]);
        echo "<h3>Tabla de multiplicar del $num</h3>";
        echo "<table border='1'>";
        echo "<tr><th>Multiplicació</th><th>Resultat</th></tr>";

        for ($i = 0; $i <= 10; $i++) { 
            echo "<tr><td>$num x $i</td><td>" . ($num * $i) . "</td></tr>";
        }
        echo "</table>";
    } 
    ?>
</body>
</html>
