// JavaScript Document
try{
	let aryNavs = [];
	let aryContents = document.getElementsByClassName("dvContent");
	let ref = document.documentURI;

	/* wireups */
	document.getElementsByTagName("nav")[0].querySelector("ul").childNodes.forEach(a => a.tagName == "LI" ? aryNavs.push(a.querySelector("a")) : null);
	aryNavs.map(a => a.addEventListener("click",changePage));

	/*route to appropriate page*/
	if(ref.indexOf("#")>=0){
		let page = ref.substring(ref.indexOf("#"));
		document.querySelector("a[href='"+page+"']").click();
	}
	/*page functions*/
	
	/*nav function*/
	function changePage(e){
		let clicked = e.target.href.substring(e.target.href.indexOf("#")+1);
		aryNavs.map(a => a.className = a === e.target ? "active" : "");
	
		for(div of aryContents)
		{
			div.className = div.className.replace(/showme|hideme/i, div.id == clicked ? "showme" : "hideme");
		}
	}

}
catch(err){
	console.log(err);
}