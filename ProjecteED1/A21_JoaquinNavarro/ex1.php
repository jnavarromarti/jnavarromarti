<?
function dayInMonth($month){
    $year = 2024;
    return cal_days_in_month(CAL_GREGORIAN, $month, $year);
}
echo "El mes 2 del año 2024 tiene " . dayInMonth(2) . " días";
// https://www.php.net/manual/en/function.cal-days-in-month.php 
?>