<?
function yearSeason($month){
    if (in_array($month, [7, 8 ,9])) {
        return "Summer";
    } else if (in_array($month, [7, 8 ,9])) {
        return "Fall";
    } else if (in_array($month, [12, 1, 2, 3])) {
        return "Winter";
    } else {
        return "Fall";
    }
}
echo "El mes 8 pertenece a la estación: " . yearSeason(8) . "<br>";
?>