import {Skip_To_Nd} from "./Vid.js";

const skipButtonObserver=new MutationObserver(mutations=>
{
	for(const mutation of mutations)
	{
		for(const node of mutation.addedNodes)
		{
			if(!(node instanceof HTMLElement))
			{continue;}

			// Check if it's the button directly
			if(node.matches("button.ytp-skip-ad-button"))
		{
				console.log("🎯 Skip-ad button created:", node);
				// You can call your skip handler here
				Handl_Skip_Butn(node);
			}
			else
			{
				// Or check if it's nested inside something else
				const btn = node.querySelector("button.ytp-skip-ad-button");
				if (btn) {
					console.log("🎯 Skip-ad button nested in:", node);
					Handl_Skip_Butn(btn);
				}
			}
		}
	}
});

skipButtonObserver.observe(document.documentElement,{
	childList:true,
	subtree:true});
document.querySelectorAll("button.ytp-skip-ad-button")
				.forEach(Handl_Skip_Butn);

function Handl_Skip_Butn(btn)
{
	console.log("🚀 You can now click or observe:",btn);
	Skip_To_Nd();
}