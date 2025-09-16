import {Sim_Clik} from "./Input.js";
export function Try_Skip()
{
	const Butn=document.querySelector("button.ytp-skip-ad-button");
	if(Butn)
	{
		if(
			Butn.disabled||
			Butn.getAttribute("aria-disabled")==="true")
		{
			console.log("⏳ skip-button still disabled");
			return;
		}
		console.log("✅ skip-ad-button enabled, clicking now|"+Butn);
		Sim_Clik(Butn);
		// ClEnup();
	}
	else
	{
		console.log("No skip-ad-button found");
	}
}