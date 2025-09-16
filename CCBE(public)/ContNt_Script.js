console.log("Ad-blocker init beginning...");

// import {Is_Ad_PlAng} from "./Ad.js";
// import {Skip_To_Nd} from "./Vid.js";
// import {Try_Skip} from "./Auto_Skip.js";

var Norml_WAt=2,
	 Is_1st=true,
	DlA_1st=8,
	Ad1_ZOn=15,
	Ad1_Nd;
	function DclAr_Past_1st()
	{
		if(Is_1st)
		{
			Is_1st=false;

			console.log("⏳ Removing "+DlA_1st+" sec delay; past 1st ad.");
		}
	}
	function Get_Specfc_DlA()
	{
		if(Is_1st||
		   (Date.now()>(Ad1_Nd+(Ad1_ZOn*1000))))
		{
			DclAr_Past_1st();

			return DlA_1st;
		}
		else
		{
			return		0;
		}
	}
	function Set_Ad1_Nd()
	{Ad1_Nd=Date.now();}

	// 1) Hook history.pushState/replaceState so we catch SPA nav
	function hookUrlChange()
	{
		const origPush=history.pushState;
		history.pushState=function(...args)
		{
			origPush.apply(this,args);
			window.dispatchEvent(new Event("locationchange"));
		};
		const origReplace=history.replaceState;
		history.replaceState=function(...Rgg)
		{
			origReplace.apply(this,Rgg);
			window.dispatchEvent(new Event("locationchange"));
		};
		window.addEventListener('popstate', () =>
			window.dispatchEvent(new Event("locationchange"))
		);
	}
	hookUrlChange();
	window.addEventListener("yt-navigate-finish",()=>
	{
		Is_1st=true;
		console.log('🔄 New video detected – first-ad delay re-armed');
	});
	window.addEventListener("locationchange",()=>
	{
		Is_1st=true;
		console.log('🔄 New video detected – first-ad delay re-armed');
	});

let Skipbl_Obsrvr,Intrvl;
	function Get_Intrvl()
	{
		return Intrvl;
	}
	function Set_Intrvl(ValU)
	{
			   Intrvl=ValU;
		return Intrvl;
	}
	function ClEr_Intrvl()
	{
		clearInterval(Get_Intrvl());
		Intrvl=null;

		return Intrvl;
	}
	function ClEnup()
	{
		if(Skipbl_Obsrvr){Skipbl_Obsrvr.disconnect();}
		if(Intrvl		){			   ClEr_Intrvl();}
	}

//<editor-fold desc="BAsc nav">
function Set_Vid_TIm(Vid,TIm)
{
	console.log("⏳ Setting vid time to "+TIm,Vid);
	Vid.currentTime=TIm+6;
}
var Dfalt_BfOr=.01;
function Get_Nd_TIm(Vid,BfOr=Dfalt_BfOr)
{
	const Dr=Vid.duration,TIm=   Dr  -  BfOr;
	console.log("⏳ Calculating end time "+Dr+"-"+BfOr+"="+TIm);

	return Math.max(0,TIm);
}
function   Skip_$Nd(Vid,BfOr=Dfalt_BfOr)
{
	Set_Vid_TIm(Vid,
	 Get_Nd_TIm(Vid,BfOr));
}
//</editor-fold>
function Is_Ad_PlAng()
{
	return document.querySelector(
		//"video"/*
	".html5-video-player"//*/
	)?.
		classList.contains("ad-showing");
}
//<editor-fold desc="Skip.js">
var On_Nds=1;
function Skip_If_TIm(Intrvl,Vid,Aftr)
{
	if(Vid&&Is_Ad_PlAng())
	{
		const		Trigrd_At=Vid.currentTime;
		if(isFinite(Trigrd_At)&&
				  ((Trigrd_At)>Aftr))
		{
			Skip_$Nd(Vid,On_Nds);
			console.log(   "⏭️ Skipping now "	 +Trigrd_At+"→"+Vid.currentTime);

			// if(!Is_Ad_PlAng())
			// {ClEr_Intrvl(Intrvl);}
		}
		else
		{
			console.log("⏳ Not skipping yet, @ "+Trigrd_At+"/"+Aftr);
		}
		// else
		// {
		// 	console.log("⏳ Skipping not yet "+Trigrd_At+"→"+Vid.currentTime,Vid);
		// }
		// }
	}
}
function Skip_Via_SEk(Butn)
{
	// console.log("🚀 You can now click or observe: ",Butn);

	const Vid=document.querySelector("video");
	if(	  Vid)
	{
		const Aftr=Norml_WAt+Get_Specfc_DlA();
		console.log("Prepping to skip vid after "+Aftr+": ",Vid);
		Set_Intrvl(setInterval(
			()=>
			{Skip_If_TIm(Intrvl,Vid,Aftr);},
			On_Nds*1000));
	}
}
const Skip_Butn_Obsrvr=new MutationObserver(MutAtng=>
{
	for(const MutAtn of MutAtng)
	{
		for(const NOd of MutAtn.addedNodes)
		{
			if(!(NOd instanceof HTMLElement))
			{continue;}
			if(  NOd.matches("button.ytp-skip-ad-button"))
			{
				// console.log("🎯 Skip-ad button created: ",NOd);
				Skip_Via_SEk(NOd);
			}
			else
			{
				const Butn=NOd.querySelector("button.ytp-skip-ad-button");
				if(Butn)
				{
					// console.log("🎯 Skip-ad button nested in: ",NOd);
					Skip_Via_SEk(Butn);
				}
			}
		}
	}
});

Skip_Butn_Obsrvr.observe(document.documentElement,{
	childList:true,
	subtree  :true});
document.querySelectorAll("button.ytp-skip-ad-button")
	.forEach(Skip_Via_SEk);
//</editor-fold>

//<editor-fold desc="Clik">
const Norml_SeqNc=["mousedown","mouseup","click"];
function Sim_Clik(Butn)
{
	const prev=parseInt(Butn.dataset.clickCount||"0",10);
	Butn.dataset.clickCount=""+(prev+1);
	Norml_SeqNc.forEach((type)=>
	{
		Butn.dispatchEvent(
			new MouseEvent(type,{bubbles:true,cancelable:true}));
	});
}
//</editor-fold>

function Try_Skip_Via_Butn(Butn)
{
	if(
		Butn.disabled||
		Butn.getAttribute("aria-disabled")==="true")
	{
		console.log("⏳ skip-button still disabled");
		return;
	}
	console.log("✅ skip-ad-button enabled, clicking now|",Butn);
	Sim_Clik(Butn);
	Butn.click();
	// ClEnup();
}
	function Try_Find_Skip()
	{
		const Butn=document.querySelector("button.ytp-skip-ad-button");
		if(Butn)
		{Try_Skip_Via_Butn(Butn);}
		else
		{console.log("No skip-ad-button found");}
	}

//<editor-fold desc="Stuf that Uss Try_Skip">
if(false)
{
	Skipbl_Obsrvr=new MutationObserver(MutAtng=>
	{
		MutAtng.forEach((MutAtn)=>
		{
			if(
				MutAtn.type==="attributes"&&
				MutAtn.target.matches("button.ytp-ad-skip-button")&&(
				MutAtn.attributeName==="disabled"||
				MutAtn.attributeName==="aria-disabled"))
			{Try_Skip_Via_Butn(MutAtn.target);}
		});
	});
	Skipbl_Obsrvr.observe(document.body,{
		subtree:true,
		childList:true,
		attributes:true,
		attributeFilter:["disabled","aria-disabled"]});
	//2. Poll in case the Skipbl_Obsrvr misses the initial enable
	Intrvl=setInterval(Try_Find_Skip,500);
}
//</editor-fold>

console.log("Ad-blocker init done.");