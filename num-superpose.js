<div style="padding:0px; width:85px; height:85px;" class="cmd #history# container-fluid tooltips cmd-widget" data-type="info" data-version="#version#" data-eqLogic_id="#eqLogic_id#" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#">
 		<img class="fond#uid#"/>
 		<img class="bandeau#uid#"/>
		<img class="icon#uid#" style="transform:translate(-50%,-50%);" />
		<div class="partieentiere#uid#"style=""></div>
		<div class="partiedecimale#uid#"style=""></div> 
 		<div class="unite#uid#">#unite#</div> 
		<div class="nomcmd#uid#">#name_display#</div>
 
	<style>
		div.nomcmd#uid# {
			font-size:1em;
			font-weight:bold;
			position:absolute;
			vertical-align:middle;
			top:82%;
			left:0%;
			width:85px;
			height:85px;
			z-index:4;
		}
		div.unite#uid# {
			font-size:1.2em;
			font-weight:bold;
			position:absolute;
			top:60%;
			width:85px;
			height:85px;
			z-index:4;
			letter-spacing:0px;
		}
      	div.partieentiere#uid# {
			font-size:3em;
			font-weight:bold;
			position:absolute;
			top:30%;
			right:0%;
			width:85px;
			height:85px;
			z-index:4;
			letter-spacing:0px;
		}
		div.partiedecimale#uid# {
			font-size:2em;
			font-weight:bold;
			position:absolute;
			top:34%;
			right:0%;
			width:85px;
			height:85px;
			z-index:4;
			letter-spacing:0px;
		}
		img.fond#uid# {
			position:absolute;
			top:0%;
			left:0%;
			width:85px;
			height:85px;
			z-index:1;
		}
		img.bandeau#uid# {
			position:absolute;
			top:0%;
			left:0%;
			width:85px;
			height:85px;
			z-index:2;
		}
		img.icon#uid# {
			position:absolute;
			margin:0;
			top:45%;
			left:50%;
			height:55px;
			width:55px;
			z-index:2;
		}
 	</style>

	<script>
		jeedom.cmd.update['#id#'] = function(_options){
			// Récupération des srcStates
			var srcState = _options.display_value;

			// Séparation des entier et décimal
			var srcEntier = Math.trunc(srcState);
			var srcDecimal = Math.abs(Math.round(srcState*10-srcEntier*10));

			// Regle d'affichage des decimaux suivant le srcState a afficher
			if ( srcEntier == 1 ) {
				$('.partieentiere#uid#').empty().text(srcEntier);
				$('.partieentiere#uid#').attr('style', 'right:5%;');
				$('.partiedecimale#uid#').empty().text("."+srcDecimal);
				$('.partiedecimale#uid#').attr('style', 'right:-20%;');
			} else if ( ( srcEntier == -1 ) || ( srcState >= 0 && srcState < 10 ) ){
				$('.partieentiere#uid#').empty().text(srcEntier);
				$('.partieentiere#uid#').attr('style', 'right:12%;');
				$('.partiedecimale#uid#').empty().text("."+srcDecimal);
				$('.partiedecimale#uid#').attr('style', 'right:-20%;');
			} else if ( srcState < 0 && srcState > -1 ) {
				$('.partieentiere#uid#').empty().text("-"+srcEntier);
				$('.partieentiere#uid#').attr('style', 'right:15%;');
				$('.partiedecimale#uid#').empty().text("."+srcDecimal);
				$('.partiedecimale#uid#').attr('style', 'right:-20%;');
			} else if ( srcState < 0 && srcState > -10 ) {
				$('.partieentiere#uid#').empty().text(srcEntier);
				$('.partieentiere#uid#').attr('style', 'right:15%;');
				$('.partiedecimale#uid#').empty().text("."+srcDecimal);
				$('.partiedecimale#uid#').attr('style', 'right:-20%;');
			} else if ( ( srcState <= -10 && srcState > -100 ) || ( srcState >= 10 && srcState < 100 ) ) {
				$('.partieentiere#uid#').empty().text(srcEntier);
				$('.partieentiere#uid#').attr('style', 'right:15%;');
				$('.partiedecimale#uid#').empty().text("."+srcDecimal);
				$('.partiedecimale#uid#').attr('style', 'right:-30%;');
			} else if ( ( srcState >= 100) || ( srcState <= -100) ) {
				$('.partieentiere#uid#').empty().text(srcEntier);
				$('.partieentiere#uid#').attr('style', 'right:0%;');
			}
 
			// Gestion des icones et couleurs
			var fldBkg = 'data/customTemplates/dashboard/cmd.action.other.Multi-action-Defaut/fond/';
													// Dossier des images de fond
			var fldIcon = 'data/customTemplates/dashboard/cmd.action.other.Multi-action-Defaut/';
													// Dossier de l'image superposée
			var srcIcon = ('#icon#'!='#'+'icon#') ? '#icon#' : "";
													// Image superposée
			var srcTheme = ('#theme#'!='#'+'theme#') ? '#theme#': "";
													// Theme du fond s'il y a lieu
			var srcUnit = ('#unit#'!='#'+'unit#') ? '#unit#' : "";
													// Affichage ou non de l'unité
			var srcMin = (is_numeric('#min#')) ? parseFloat('#min#') : null;
													// Valeur image de fond min
			var srcMax = (is_numeric('#max#')) ? parseFloat('#max#') : null;
													// Valeur image de fond max
			var srcField = srcMax - srcMin;			// Plage totale de calcul de l'image de fond
			var srcStep = srcField/8;				// Intervalle entre 2 fonds différents, 9 correspond au nombre d'intervalle pour 11 fonds
			var srcMinLevel = 1;					// Niveau min du bandeau (les images de fond vont de 1 à 11)
			var srcMaxLevel = 10;					// Niveau max du bandeau
			var srcLevel = 0;						// Niveau du bandeau calculé
			var srcStateShift = srcState - srcMin;	// State décalé en fonction du Min pour calculer l'image du fond
			var srcTxtVal = "";						// Couleur des caractères de la valeur de la commande
			var srcValBanner = "";					// Couleur des caractère du bandeau
			var srcMode = "light"					// Mode du fond (dark ou light)
			var srcTxtBanner = "black"				// Couleur des caractères du bandeau

			// Calcul du logo à afficher
			if (srcMin == null || srcMax == null || srcMax <= srcMin || srcStep < 1) {
				// Cas où les paramètres passés ne permettre pas de choisir le fond
				srcValBanner = "error";
			}
			else {
				// Cas où les paramètres permettent le calcul
				srcLevel = Math.round(Math.abs(srcStateShift/srcStep))+1;
				if (srcState <= srcMin){
					srcValBanner = srcMinLevel.toString();
				} else if (srcState >= srcMax){
					srcValBanner = srcMaxLevel.toString();
				}
				else {
					srcValBanner = srcLevel.toString();
				}
			}
			// Calcul de la couleur des caractères de la valeur de la commande et du bandeau
			switch (srcValBanner) {
				case "1":
					srcTxtVal = "aqua";
					srcTxtBanner = "black"
					break;
				case "2":
					srcTxtVal = "blue";
					srcTxtBanner = "white"
					break;
				case "3":
					srcTxtVal = "lime";
					srcTxtBanner = "white"
					break;
				case "4":
					srcTxtVal = "yellow";
					srcTxtBanner = "black"
					break;
				case "5":
					srcTxtVal = "lightsalmon";
					srcTxtBanner = "black"
					break;
				case "6":
					srcTxtVal = "orange";
					srcTxtBanner = "black"
					break;
				case "7":
					srcTxtVal = "darkorange";
					srcTxtBanner = "white"
					break;
				case "8":
					srcTxtVal = "red";
					srcTxtBanner = "white"
					break;
				case "9":
					srcTxtVal = "darkred";
					srcTxtBanner = "white"
					break;
				case "10":
					srcTxtVal = "black";
					srcTxtBanner = "white"
					break;
				default:
					srcValBanner = "error";
			}
					
			// Sélection du mode clair ou sombre
			if ($('body')[0].hasAttribute('data-theme')) {
				if ($('body').attr('data-theme').endsWith('Light')) {
					srcMode = "light";
				} else {
					srcMode = "dark"
				}
			}
			//Affichage du fond et du nom de la commande
			if (srcTheme != "") {
				srcTheme = srcTheme + "_";}
			if (srcValBanner == "error") {
				$('.fond#uid#').empty().attr("src", fldBkg + "fo_oups1.png");
			} else {
				$('.fond#uid#').empty().attr("src", fldBkg + "fo_bkg_" + srcTheme + srcMode + ".png");
				$('.bandeau#uid#').empty().attr("src", fldBkg + "fo_banner_" + srcValBanner + ".png");
			}
			$(".nomcmd#uid#").css( "color",srcTxtBanner);
			
			// Affichage de l'unité sauf si pas si demandé
			if (srcUnit != "no") {
				$(".partieentiere#uid#,.partiedecimale#uid#,.unite#uid#").css("color",srcTxtVal);
			} else {
				$(".partieentiere#uid#,.partiedecimale#uid#").css("color",srcTxtVal);
				$(".unite#uid#").hide();
			}
			
			// Affichage de l'image superposée si demandé
			if (srcIcon != "") {
				$('.icon#uid#').empty().attr('src', fldIcon+srcIcon);
			} else {
				$(".icon#uid#").hide();
			}
			
			$('.cmd[data-cmd_id=#id#]').attr('title','Valeur du '+_options.valueDate+', collectée le '+_options.collectDate);
		}
		jeedom.cmd.update['#id#']({display_value:'#state#',valueDate:'#valueDate#',collectDate:'#collectDate#',alertLevel:'#alertLevel#'});
	</script>
</div>