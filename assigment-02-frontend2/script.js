let app = angular.module("myApp", [])

app.controller("allMemesController", function($scope, $http) {
	$http.get("https://api.imgflip.com/get_memes")
	.then(function(response) {
		console.log(response);
		$scope.memes = response.data.data.memes;
	});
});

app.controller("singleMemeController", function($scope, $http) {

	$http.get("https://api.imgflip.com/get_memes")
	.then(function(response) {
		let top100memes = response.data.data.memes;
		let randomMemeId = parseInt(Math.random()*top100memes.length);
		let username = "iranoutbutistillneedtotestmore"//"imgflipNackademin";
		let password = "iranoutbutistillneedtotestmore"//"imgflip92";
		let memeTextList = [
			"dåligt väder",
			"fåglar",
			"dåliga nyheter",
			"en ny telefon",
			"rätt kläder",
			"bilar",
			"rolig text",
			"olycka som inte var rolig",
			"sen inlämning",
			"donald duck",
			"undefined",
			"cors origin error",
		];
		let memeTextAlreadyUsed = false;
		let randomNumberList = []
		for (var i = 0; i < top100memes[randomMemeId].box_count; i++) {
			let rndNumber = parseInt(Math.random()*memeTextList.length);
			for (var z = 0; z < randomNumberList.length; z++) {
				if (rndNumber == randomNumberList[z]) {
					memeTextAlreadyUsed = true;
					break;
				}
			}
			if (!memeTextAlreadyUsed) {
				randomNumberList.push(rndNumber);
			} else {
				memeTextAlreadyUsed = false;
				i--;
			}
		}

		//replace " " in captions to %20 that the url uses
		for (var i = 0; i < memeTextList.length; i++) {
			memeTextList[i].replace(" ", "%20");
		}

		let request = "https://api.imgflip.com/caption_image?";
		request += `template_id=${top100memes[randomMemeId].id}`;
		request += `&username=${username}`;
		request += `&password=${password}`;
		for (var i = 0; i < randomNumberList.length; i++) {
			request += `&text${i}=${memeTextList[randomNumberList[i]]}`;
		}
		console.log(top100memes[randomMemeId].box_count ,randomNumberList.length ,request);

		//console.log(request)
		
		/*let data = {
			template_id: '181913649',
			username: username,
			password: password,
			text0: topText(),
			text1: bottomText(),
		}*/
		$http.get(request)
		.then(function(response2) {
			//console.log(response);
			$scope.meme = response2.data.data.url;
		});
	});
});
