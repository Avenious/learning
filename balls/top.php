<?php

declare(strict_types=1);


require_once 'connect.php';
$mysqli = new mysqli($host, $user, $password, $database);
if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
if (isset($_GET['score'], $_GET['name'])) {
   $name = $_GET['name'];
   $score = (int)$_GET['score'];    
   $query = $mysqli->query("INSERT INTO `top10` (`name`, `score`) VALUES (' {$_GET['name']}', '{$_GET['score']}')");  
    header('Location: ' . basename($_SERVER['SCRIPT_FILENAME']));    
    exit;
     
}

$query = ('SELECT * FROM top10 ORDER BY score DESC');
$player = ('SELECT * FROM top10 ORDER BY id DESC LIMIT 1');
$rowPlayer = mysqli_query($mysqli, $player);

$result = mysqli_query($mysqli, $query) or die("Ошибка " . mysqli_error($mysqli)); 
if($result)
{
   
    $rows = mysqli_num_rows($result);
    
    $rowBold = mysqli_fetch_row($rowPlayer);
    //echo $rowBold[1];
    
    
    
    
    echo "<table><tr><th>Имя</th><th>Очки</th></tr>"; 

        
    for ($i = 0 ; $i < $rows ; ++$i ) {
        $row = mysqli_fetch_array($result);
        echo "<tr>";        
            for ($j = 1 ; $j < 3 ; ++$j) {

                if ($row[$j] == $rowBold[1]) {
                    echo "<td><b>$row[$j]</b></td>";
                }
                else{
                    echo "<td>$row[$j]</td>";
                }
                
                
            }         
        
        echo "</tr>";
    }
    echo "</table>";
    echo '<button><a href="index.html">Play again</a></button>';
    mysqli_free_result($result);

}

mysqli_close($mysqli);
?>


