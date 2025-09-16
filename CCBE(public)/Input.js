const Norml_SeqNc=["mousedown","mouseup","click"];

export function Sim_Clik(Butn)
{
	Norml_SeqNc.forEach((type)=>
	{
		Butn.dispatchEvent(
			new MouseEvent(type,{bubbles:true,cancelable:true}));
	});
}