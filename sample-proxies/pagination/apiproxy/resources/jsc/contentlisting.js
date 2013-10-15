var books = {
	book: []
};


for (var i=0 ; i < 100 ; i++) {
	  
books.book.push({ 
	"id" : i,
	"title" : "book title " + i,
	"author" : "book author " + i,
	"comments" : "book comments " + i
});
	      
}

context.setVariable("response.content", JSON.stringify(books));

