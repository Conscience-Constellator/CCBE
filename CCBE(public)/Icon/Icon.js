import {Sesn_Rapr} from "../StOrg/StOrg.js";

export function Set_Icon(Icon)
{
	var Data=Icon.getImageData(0,0,19,19);
	chrome.action.setIcon({imageData:Data});
}
export function Set_Icon_FIl(URL)
{chrome.action.setIcon({path:URL+".png"});}
export function Set_Tab_Icon(Tab,Icon)
{chrome.action.setIcon({tabId:Tab.id,path:Icon});}
import {Get_Bool_Colr} from "../Colr.js";
//import {Paris} from "./Cod.js";
export function Set_Icon_StR(Colr)
{
	if((typeof Colr)!=="string")
	{
		const
			R=Colr[0],
			Y=Colr[1],
			B=Colr[2];
		if
		(
			(R==undefined)|
			(Y==undefined)|
			(B==undefined))
		{throw new Error("Can't make Colr from ("+R+","+Y+","+B+")");}
		Colr=Get_Bool_Colr(R,Y,B);
	}

	Set_Icon_FIl("StR "+Colr);
}

export function Set_Icon_To_StR(Colr)
{
	var Canvas=document.createElement("canvas");
	var ContXt=Canvas.getContext("2d");
	Draw_StR(ContXt,Colr);
	Set_Icon(ContXt);
}

import {URL_Num} from "../BookmRk/BookmRk.js";
export function Bfor_Alrt(TXt=null){}
var Saf_Alrt=Bfor_Alrt;
//Saf_Alrt=alert;
export async function Set_Icon_Basd_On_URL(URL)
{
	Saf_Alrt("Tab updatd");
	//Set_Icon_StR([0,0,await URL_Num(URL)]);
}

export function Get_StR_Icon_NAm(R,Y,B)
{return "/Icon/StR "+Get_Bool_Colr(R,Y,B)+".png";}

export const Icong={
	Blak:null,Red:null,
	Orng:null,YLO:null,
	GrEn:null,Blu:null,
	Prpl:null,WIt:null,
}
function preloadImages()
{
	const imagePaths={
		bookmarked:"icons/bookmarked.png",
		default:"icons/default.png",
		special:"icons/special.png"
	};

	Object.keys(imagePaths).forEach((key)=>{
		loadImageToBase64(imagePaths[key],(base64)=>
			{imageCache[key]=base64;});
	});
}

import {Ny} from "../Math/Math_Plus.js";
import {Get_MRk_Num} from "../BookmRk/BookmRk.js";
// import {Get_Is_MRkd,Get_Prim_TrE_NAm} from "../BookmRk/BookmRk_StOrg.js";
// import {TrE_ContAns} from "../BookmRk/BookmRk_List.js";
import {Find_Dup_Tabg} from "../Tab.js";
export async function Dup_Chekr(Tab)
{return (await Find_Dup_Tabg({windowId:Tab.windowId})).length>0;}
export var R_SOrc=async (Tab)=>
{return Ny(await Get_MRk_Num({url:Tab.url}));};
import {Has_URL} from "../BookmRk/BookmRk.js";
import {Get_StOr} from "../StOrg/IndXd_DB/IndXd_DB.js";
export var G_SOrc=async (Tab)=>
{
	try
	{
		return Has_URL(
			await Get_StOr("BookmRk","Horblns2"),
			Tab.url)
		// await(async ()=>{
		// 	const TrE=await Sesn_Rapr.Get_Item("Horblns2")
		//
		// 	return (TrE)?TrE_ContAns(
		// 		TrE,
		// 		(NOd)=>{return NOd.url===URL;}):
		// 		false;
		// 	return false;
		// })(),
	}
	catch(X)
	{
		return 0;
	}
};
export var B_SOrc=Dup_Chekr;
export async function Get_Apropriat_Icon(Tab)
{
	return Get_StR_Icon_NAm(
		await R_SOrc(Tab),
		await G_SOrc(Tab),
		await B_SOrc(Tab));
}
export async function UpdAt_Tab_Icon(Tab)
{
	if(!(Tab&&(Tab.id>0)&&Tab.url))
	{return;}

	Set_Tab_Icon(Tab,await Get_Apropriat_Icon(Tab));
}
/*Updates A primary color of icon.*/
export function UpdAt_Icon_Colr(Tab,)
{}