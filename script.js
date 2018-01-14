let buttons = document.querySelectorAll('.button');
let screen = document.getElementById("Screen");
let equals = document.getElementById("Button15");
let word = [];
let temp = "";
let symbol_prev = false;

function Add(a, b)
{
	return ((a*1)+(b*1));
}

function Subtract(a, b)
{
	return ((a*1)-(b*1));
}

function Multiply(a, b)
{
	return (a*b);
}

function Divide(a, b)
{
	if((b*1) == 0)
	{
		return "Error";
	}
	return (a/b);
}

function Operate(operator, a, b)
{
	switch(operator)
	{
		case '÷':
			return (Divide(a, b));

		case '*':
			return (Multiply(a, b));

		case '+':
			return (Add(a, b));

		case '-':
			return (Subtract(a, b));
	}
}

function Solve(solvent)
{
	let a = "";
	let b = 0;
	let div = 0;
	let mult = 0;
	let add = 0;
	let sub = 0;
	let temp = [];
	let zero_div = false;

	if(solvent.length < 1)
	{
		screen.innerText = "Error";
		solvent = [];
	}

	let text = solvent.join("");
	for(var z = 0; z < text.length; z++)
	{
		if(text.charAt(z) > -1 && text.charAt(z) < 10)
		{
			a += text.charAt(z);
		}
		else
		{
			temp.push(a);
			temp.push(text.charAt(z));
			a = "";

			switch(solvent[z])
				{
					case '÷':
						div++;
						break;

					case '*':
						mult++;
						break;

					case '+':
						add++;
						break;

					case '-':
						sub++;
						break;
				}
		}
	}
	if(a != "")
	{
		temp.push(a);
		a = "";		
	}
	if(div > 1 || mult > 1 || sub > 1 || add > 1)
	{
		solvent = [];
		screen.innerText = "Error!";
	}

	div = temp.indexOf('÷');
	mult = temp.indexOf('*');
	add = temp.indexOf('+');
	sub = temp.indexOf('-');


	while(div != -1)
	{
		div = temp.indexOf('÷');
		b = Operate('÷', temp[div-1],temp[div+1]);
		if(b == "Error")
		{
			zero_div = true;
		}
		temp.splice(div-1, 3, b);
		div = temp.indexOf('÷');
	}
	while(mult != -1 && zero_div == false)
	{
		mult = temp.indexOf('*');
		b = Operate('*', temp[mult-1],temp[mult+1]);
		temp.splice(mult-1, 3, b);
		mult = temp.indexOf('*');
	}
	while(add != -1 && zero_div == false)
	{
		add = temp.indexOf('+');
		b = Operate('+', temp[add-1],temp[add+1]);
		temp.splice(add-1, 3, b);
		add = temp.indexOf('+');
	}
	while(sub != -1 && zero_div == false)
	{
		sub = temp.indexOf('-');
		b = Operate('-', temp[sub-1],temp[sub+1]);
		temp.splice(sub-1, 3, b);
		sub = temp.indexOf('-');
	}

	if(zero_div == true)
	{
		screen.innerText = "Error!";
		temp = [];
		zero_div = false;
	}
	else
	{
		b = temp.join("");
		screen.innerText = b;
	}
}

for (var i = 0; i < buttons.length; i++) 
{
	buttons[i].addEventListener('click', (e) =>{
		// console.log(e);
		if(e.target.innerText == 'AC')
		{
			word = [];
			screen.innerText = word;
		}
		if(e.target.classList.contains("symbol"))
		{
			if(word.length < 1)
			{
				screen.innerText = "Error!";
			}
			else if(symbol_prev == true)
			{
				word = [];
				screen.innerText = "Error!";
				symbol_prev = false;
			}
			else
			{
				word.push(e.target.innerText);
				// console.log(word);
				screen.innerText = word.join("");
				symbol_prev = true;
			}
		}
		else if(e.target.classList.contains("number"))
		{
			if(word.length > 7)
			{
				word = [];
				screen.innerText = "Limit!";
			}
			else
			{
				word.push(e.target.innerText);
				// console.log(word);
				screen.innerText = word.join("");
				symbol_prev = false;
			}
		}
		else if(e.target.innerText == "=")
		{
			Solve(word);
			word = [];
		}
	})
}
