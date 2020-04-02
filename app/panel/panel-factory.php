<?PHP

require("../database/DAL/teste-db-regions.php"); //requisita arquivo DAO para Acessar funcoes db
require("../database/DAL/db-reasons.php");

function fuelColor ($time) {
    if($time >= 45){ return "red"; }
    elseif($time >= 30){ return "yellow"; }
    elseif($time >= 15){ return "green"; }
    return "white";
};

function CreateDivRegion($region){ //funcão retorna a div pronta
    $divs = "";

    $bases = GetBasesByRegion($region); //solicita Json
    
    if(count($bases) > 12){
        
        $divs .="<div class='brick other-border'>
                    <div class='base-name'>Região Inteira</div>
                    <div class='xfuel-content'>
                        <div class='white-dot'></div>
                    </div>
                </div>";

    }elseif(count($bases) > 0){
        
        foreach($bases as $base){ //Percorre Json e cria as divs BASE
            
            $border = $base->reason . "-border";

            $divs .="<div class='brick $border'>
                        <div class='base-name'>$base->location</div>
                        <div class='xfuel-content'>
                            <div class='" . 
                            fuelColor($base->fuelTime) .
                             " dot'></div>$base->fuelTime
                        </div>
                    </div>";
        }
    }
    
    echo $divs;
}
?>