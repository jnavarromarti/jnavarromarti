<?
function isMultiple($num){
    if ($num % 3 && $num % 5 == 0){
        return true;
    } else {
        return false;
}
}
echo "El número 15 es múltiplo de 3 y 5: " . isMultiple(15) . "<br>";
?>