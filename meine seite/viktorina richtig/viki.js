//Roman Schesler
//25.10.2022

const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищет, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Du kennst mich nicht, aber das macht nichts. &#128521" , 0),
	new Result("Tja, vielleicht bist du mein/e alter/e Freund/in.. &#129320", 2),
	new Result("Hm.. wir haben uns bestimmt schon paar mal getroffen. &#129300", 4),
	new Result("Wow ! Ich glaube wir kennen uns oder du bist ein Hexenmeister ! &#128561", 6)
];

//Массив с вопросами
const questions = 
[
	new Question("'Wie alt bin ich ?'", 
	[
		new Answer("15", 0),
		new Answer("20", 1),
		new Answer("30", 0),
		new Answer("44", 0)
	]),

	new Question("'Woher komme ich ? '", 
	[
		new Answer("USA", 0),
		new Answer("Deutschland", 0),
		new Answer("Japan", 0),
		new Answer("Kasachstan", 1)
	]),

	new Question("'Was mache ich am liebsten ?'", 
	[
		new Answer("Chillen", 1),
		new Answer("Basketballspielen", 0),
		new Answer("Lernen", 0),
		new Answer("Zocken", 0)
	]),

	new Question("Welche Sprache kann ich ?", 
	[
		new Answer("Deutsch", 0),
		new Answer("Russisch", 0),
		new Answer("Englisch", 0),
		new Answer("Alle oben genannte", 1)
	]),

	new Question("'Wovon träume ich ?'", 
	[
		new Answer("Stabiler und liebevoller Job.", 0),
		new Answer("Um die Welt reisen.", 0),
		new Answer("Erreichen alle meine Hauptziele.", 0),
		new Answer("Alle oben genannte", 1)
	]),

	new Question("'Wer bin ich?", 
	[
		new Answer("Pessimist", 0),
		new Answer("Ein Mensch, der das Leben liebt.", 1),
		new Answer("Fussballspieler", 0),
		new Answer("Schüler", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяет, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняет вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляет старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создает кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводит номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызывает функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводит результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Score: " + quiz.score;
	}
}

function Init()
{
	//Находит все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляет событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получает номер правильного ответа
	let correct = quiz.Click(index);

	//Находит все кнопки
	let btns = document.getElementsByClassName("button");

	//Делает кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то подсвечивает правильный ответ зелёным, а неправильный красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//или просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждет секунду и обновляет тест
	setTimeout(Update, 1000);
}