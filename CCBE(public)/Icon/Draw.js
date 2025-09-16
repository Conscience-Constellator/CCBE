var Min=0;
var Max=18;
var Haf=Max*.5;
var Qartr=Max*.25;
var Qartr_3=Max*.75;
var Thrd=Max/3;
var Thrd_2=Max=Max-Thrd;
var Sixth=Max/6;

const StR=
{
	Fram:
	{
		Bot_Lin:Qartr,
		Top_Lin:Qartr_3,
		LFt:Min,
		Rit:Max,
		Bot:Min,
		Top:Max,
		Colr:RGB(Colr_Max,Colr_Max,Colr_Max)
	}
}
import {Ad_Atributgg} from "../Util/Atribut.js";
Ad_Atributgg(StR,
	{
		Bot:[StR.Fram.Bot,Haf],
		Top:[StR.Fram.Top,Haf],
		Bot_LFt:[StR.Fram.Bot_Lin,StR.Fram.LFt],
		Bot_Rit:[StR.Fram.Bot_Lin,StR.Fram.Rit],
		Top_LFt:[StR.Fram.Top_Lin,StR.Fram.LFt],
		Top_Rit:[StR.Fram.Top_Lin,StR.Fram.Rit],
		LFt:[Haf,Sixth],
		Rit:[Haf,Max-Sixth],
	}
)
Ad_Atributgg(StR,
	{
		Bot_Triangl:[StR.Bot,StR.Top_LFt,StR.Top_Rit],
		Top_Triangl:[StR.Bot_LFt,StR.Bot_Rit,StR.Top],
	}
)
export function Draw_StR_Fram(ContXt)
{
	const Colr=StR.Fram.Colr;
	OutlIn_ShAp(ContXt,StR.Bot_Triangl,Colr);
	OutlIn_ShAp(ContXt,StR.Top_Triangl,Colr);
}
export function Draw_Bot_Triangl(ContXt,Vectr,Colr)
{
	var A=Vectr[0],B=Vectr[1];
	
	Draw_Rad(ContXt,A,B,Sixth-3,Colr);
	A+=1;
	Draw_Rad(ContXt,A,B,Sixth-2,Colr);
	A+=1;
	Draw_Rad(ContXt,A,B,Sixth-1,Colr);
	A+=1;
	Draw_Rad(ContXt,A,B,Sixth,Colr);
}
export function Draw_Top_Triangl(ContXt,Vectr,Colr)
{
	var A=Vectr[0],B=Vectr[1];
	
	Draw_Rad(ContXt,A,B,Sixth-3,Colr);
	A-=1;
	Draw_Rad(ContXt,A,B,Sixth-2,Colr);
	A-=1;
	Draw_Rad(ContXt,A,B,Sixth-1,Colr);
	A-=1;
	Draw_Rad(ContXt,A,B,Sixth,Colr);
}
export function Fil_StR(ContXt,Colr)
{
	Fil_Shap(ContXt,StR.Bot_Triangl,Colr);
	Fil_Shap(ContXt,StR.Top_Triangl,Colr);
}
export function Draw_StR(ContXt,Colr)
{
	Fil_StR(ContXt,Colr);
	Draw_StR_Fram(ContXt);
}