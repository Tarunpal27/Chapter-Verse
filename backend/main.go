package main

import (
	"database/sql"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	// "github.com/twilio/twilio-go"
)

var store = cookie.NewStore([]byte("secret"))


// Library
type Library struct {
	LID  int    `form:"lid" json:"lid"`
	Name string `form:"name" json:"name"`
}

// Users
type User struct {
	UID      int    `form:"uid" json:"uid"`
	Name     string `form:"name" json:"name"`
	Email    string `form:"email" json:"email"`
	Contact  int    `form:"contact" json:"contact"`
	Role     string `form:"role" json:"role"`
	LID      int    `form:"lid" json:"lid"`
	Password string `form:"password" json:"password"`
}

// BookInventory
type BookDetail struct {
	ISBN            string `form:"isbn" json:"isbn"`
	LID             int    `form:"lid" json:"lid"`
	Title           string `form:"title" json:"title"`
	Author          string `form:"author" json:"author"`
	Publisher       string `form:"publisher" json:"publisher"`
	Version         int    `form:"version" json:"version"`
	TotalCopies     int    `form:"totalcopies" json:"totalcopies"`
	AvailableCopies int    `form:"availablecopies" json:"availablecopies"`
	BookImage 		string `form:"bookimage" json:"bookimage"`
}

// RequestEvents
type Request struct {
	ReqID         int       `form:"req_id" json:"req_id"`
	ISBN          string    `form:"isbn" json:"isbn"`
	ReaderID      int       `form:"reader_id" json:"reader_id"`
	RequestDate   time.Time `form:"request_date" json:"request_date"`
	ApprovalDate  time.Time `form:"approval_date" json:"approval_date"`
	ApproverID    int       `form:"approver_id" json:"approver_id"`
	RequestType   string    `form:"request_type" json:"request_type"`
	RequestStatus string    `form:"request_status" json:"request_status"`
}

// Issue Registry
type Issues struct {
	Issue_ID             int       `json:"issue_id"`
	ISBN                 string    `json:"isbn"`
	ReaderID             int       `json:"reader_id"`
	Issue_Approver_ID    int       `json:"issue_approver_id"`
	Issue_Status         string    `json:"issue_status"`
	Issue_Date           time.Time `json:"issue_date"`
	Expected_Return_Date time.Time `json:"expected_return_date"`
}

func main() {

	db, err := sql.Open("sqlite3", "/home/xs442-tarsin/library/db/mydb.db?parseTime=true")

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	r := gin.Default()
	r.Use(sessions.Sessions("mysession", store))

	r.Use(corsMiddleware())

	//Load HTML

	r.LoadHTMLGlob("../html/*.html")

	home := r.Group("/")

	{
		// home.GET("/", func(c *gin.Context) {
		// 	c.HTML(200, "home.html", nil)
		// })
		// home.GET("/signup", func(c *gin.Context) {
		// 	c.HTML(200, "signup.html", nil)
		// })
		// home.GET("/login", func(c *gin.Context) {
		// 	c.HTML(200, "login.html", nil)
		// })
		// home.GET("/password", func(c *gin.Context) {
		// 	c.HTML(200, "enterOTP.html", nil)
		// })

		//CRUD operations
		home.POST("/signup", func(c *gin.Context) {
			addUser(db, c)
		})
		home.GET("/login/:email", func(c *gin.Context) {
			login(db, c)
		})
		home.POST("/password", func(c *gin.Context) {
			verifyPassword(c)
		})
		home.GET("/logout", func (c *gin.Context)  {
			logout(c)
		})
	}

	admin := r.Group("/admin")

	{
		// admin.GET("/adminpage", func(c *gin.Context) {
		// 	c.HTML(200, "adminpage.html", nil)
		// })
		// admin.GET("/add-library", func(c *gin.Context) {
		// 	c.HTML(200, "addLibrary.html", nil)
		// })
		// admin.GET("/add-book", func(c *gin.Context) {
		// 	c.HTML(200, "addbook.html", nil)
		// })
		// admin.GET("/updatebook", func(c *gin.Context) {
		// 	c.HTML(200, "updatebook.html", nil)
		// })
		// admin.GET("/deleteOneBook", func(c *gin.Context) {
		// 	c.HTML(200, "deletebook.html", nil)
		// })
		// admin.GET("/reply-request", func(c *gin.Context) {
		// 	c.HTML(200, "replyRequest.html", nil)
		// })

		//CRUD operations
		admin.POST("/add-library", func(c *gin.Context) {
			addLibrary(db, c)
		})
		admin.POST("/add-book", func(c *gin.Context) {
			addBook(db, c)
		})
		admin.PATCH("/updatebook", func(c *gin.Context) {
			updateBook(db, c)
		})
		admin.POST("/deleteOneBook", func(c *gin.Context) {
			deleteBook(db, c)
		})
		admin.DELETE("/deleteBooks", func(c *gin.Context) {
			deleteAllBooks(db, c)
		})
		admin.POST("/reply-request", func(c *gin.Context) {
			replyRequest(db, c)
		})
		admin.GET("/all-requests", func(c *gin.Context) {
			getAllRequests(db, c)
		})
	}

	user := r.Group("/user")

	{
		// user.GET("/userpage", func(c *gin.Context) {
		// 	c.HTML(200, "userpage.html", nil)
		// })
		// user.GET("/getonebook", func(c *gin.Context) {
		// 	c.HTML(200, "getbook.html", nil)
		// })
		// user.GET("/send-request", func(c *gin.Context) {
		// 	c.HTML(200, "issueRequest.html", nil)
		// })

		//CRUD operation
		user.GET("/books", func(c *gin.Context) {
			getBooks(db, c)
		})
		user.GET("/onebook/:title", func(c *gin.Context) {
			getOneBook(db, c)
		})
		user.POST("/send-request", func(c *gin.Context) {
			issueRequest(db, c)
		})
	}

	r.Run(":8080")

}

func corsMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}

//HOME

func addUser(db *sql.DB, c *gin.Context) {
	var user User
	if err := c.Bind(&user); err != nil {
		log.Println("err", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}

	log.Println(user)

	_, err := db.Exec("INSERT into Users (name,email,contact,role,lid,password) VALUES (?,?,?,?,?,?)",
		&user.Name, &user.Email, &user.Contact, &user.Role, &user.LID, &user.Password)

	if err != nil {
		log.Println("err1", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User not added"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User added successfully"})
	c.Redirect(http.StatusFound, "/")
}

func login(db *sql.DB, c *gin.Context) {

	Email := c.Param("email")
	log.Println(Email)

	row := db.QueryRow("SELECT * from Users where Email =?", Email)
	var user User
	err := row.Scan(&user.UID, &user.Name, &user.Email, &user.Contact, &user.Role, &user.LID, &user.Password)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	} else if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No such User"})
	}
	log.Println(user)

	c.JSON(http.StatusOK, gin.H{"data":user})

	// session := sessions.Default(c)

	// session.Set("role", user.Role)
	// session.Set("code", user.Password)
	// session.Save()

	// if user.Role == "Admin" {
	// 	// c.JSON(http.StatusOK, gin.H{"message": "Welcome to Admin page"})
	// 	c.HTML(200, "adminpage.html", nil)
	// } else if user.Role == "User" {
	// 	// c.JSON(http.StatusOK, gin.H{"message": "This is the users page"})
	// 	c.HTML(200, "userpage.html", nil)
	// }

	// to := fmt.Sprint(user.Contact)
	// to = "+91" + to
	// log.Println(to)
	// sendOTP(to)
	// session.Set("contact", to)

	// c.HTML(200, "enterOTP.html", nil)

	// checkOtp(to, c)
}

func verifyPassword(c *gin.Context) {
	pass := c.PostForm("password")
	log.Println(pass)

	session := sessions.Default(c)
	savedRole := session.Get("role")
	log.Println(savedRole)
	savedPassword := session.Get("code")
	log.Println("saved",savedPassword)
	

	if savedPassword == pass {
		if savedRole == "Admin" {
			c.HTML(200, "adminpage.html", nil)
		} else if savedRole == "User" {
			c.HTML(200, "userpage.html", nil)
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wrong password"})
	}
}

//ADMIN

func addLibrary(db *sql.DB, c *gin.Context) {
	var lib Library

	if err := c.Bind(&lib); err != nil {
		log.Println("err1", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	log.Println(lib)

	_, err := db.Exec("INSERT into Library  (LID,Name) VALUES (?,?)", &lib.LID, &lib.Name)

	if err != nil {
		log.Println("err2", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Library not added"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Library added successfully"})
}

func addBook(db *sql.DB, c *gin.Context) {
	var book BookDetail
	if err := c.Bind(&book); err != nil {
		log.Println("err", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
		return
	}
	

	if book.ISBN == "" || book.ISBN == " " || book.Title == "" || book.Author=="" || book.Publisher=="" || book.Version==0 || book.TotalCopies==0 || book.AvailableCopies==0 || book.BookImage=="" {
		c.JSON(http.StatusBadRequest , gin.H{"error" : "All details not provided"})
		return
	}

	log.Println(book)
	//query to insert book
	_, err := db.Exec("INSERT into Book_Inventory (isbn,lid,title,author,publisher,version,totalcopies,availablecopies,bookimage) VALUES (?,?,?,?,?,?,?,?,?)",
		&book.ISBN, &book.LID, &book.Title, &book.Author, &book.Publisher, &book.Version, &book.TotalCopies, &book.AvailableCopies, &book.BookImage)

	if err != nil {
		log.Println("err1", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Book not added"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book added successfully"})
}

func updateBook(db *sql.DB, c *gin.Context) {
	var book BookDetail
	if err := c.Bind(&book); err != nil {
		log.Println("err1", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	log.Println(book)

	if book.ISBN==""{
		log.Println("ISBN is null")
		c.JSON(http.StatusBadRequest,gin.H{"error":"Please enter book credentials"})
		return
	}

	result, err := db.Exec("UPDATE Book_Inventory SET LID=?, Title=?, Author=?, Publisher=?, Version=?, TotalCopies=?, AvailableCopies=?, BookImage=? WHERE ISBN=?",
		&book.LID, &book.Title, &book.Author, &book.Publisher, &book.Version, &book.TotalCopies, &book.AvailableCopies, &book.BookImage, &book.ISBN)

	if err != nil {
		log.Println("err2", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Book not updated"})
		return
	}
	log.Println(result)

	c.JSON(http.StatusOK, gin.H{"message": "Book updated"})
}

func deleteBook(db *sql.DB, c *gin.Context) {
	// id := c.PostForm("isbn")
	// if err1:= c.Bind(&id); err1 != nil {
	// 	log.Println("err", err1)
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Request"})
	// 	return
	// }
	// log.Println(id)

	var book BookDetail
	if err := c.Bind(&book); err!=nil{
		log.Println("error is", err)
		c.JSON(http.StatusBadRequest,gin.H{"error":"Invalid Request"})
		return
	}

	if book.ISBN==""{
		c.JSON(http.StatusBadRequest, gin.H{"error":"Please provide the book ISBN"})
		return
	}

	_, err := db.Exec("DELETE from Book_Inventory where isbn = ?", book.ISBN)

	if err != nil {
		log.Println("err", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete book"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book deleted successfully"})
}

func deleteAllBooks(db *sql.DB, c *gin.Context) {
	_, err := db.Exec("DELETE from Book_Inventory")

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete all books"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "All books deleted"})
}

func replyRequest(db *sql.DB, c *gin.Context) {
	var req Request
	if err := c.Bind(&req); err != nil {
		log.Println("err1", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Reply"})
		return
	}

	log.Println(req)

	_, err := db.Exec("UPDATE RequestEvents SET ApprovalDate=DATE('now'), ApproverID=?, RequestStatus=? WHERE ReqID=?",
		&req.ApproverID, &req.RequestStatus, &req.ReqID)

	if err != nil {
		log.Println("err2", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Reply not sent"})
		return
	}

	row := db.QueryRow("SELECT ISBN,RequestType FROM RequestEvents WHERE ReqID=?", &req.ReqID)
	err = row.Scan(&req.ISBN, &req.RequestType)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get request"})
		return
	}

	log.Println("request", req)

	if req.RequestType == "Issue" && req.RequestStatus == "Accept" {
		_, err := db.Exec("UPDATE Book_Inventory SET AvailableCopies = AvailableCopies - 1 WHERE ISBN=?", &req.ISBN)

		if err != nil {
			log.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Book not updated"})
			return
		}
	}

	if req.RequestType == "Return" && req.RequestStatus == "Accept" {
		_, err := db.Exec("UPDATE Book_Inventory SET AvailableCopies = AvailableCopies + 1 WHERE ISBN=?", &req.ISBN)

		if err != nil {
			log.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Book not updated"})
			return
		}
	}

	
	err = db.QueryRow("SELECT ReqID,ISBN,ReaderID,ApproverID,RequestStatus,ApprovalDate from RequestEvents WHERE ReqID=?",
		&req.ReqID).Scan(&req.ReqID, &req.ISBN, &req.ReaderID, &req.ApproverID, &req.RequestStatus, &req.ApprovalDate)

	if err != nil {
		log.Println("err3", err)
	}

	var issue Issues
	issue.Issue_ID = req.ReqID
	issue.ISBN = req.ISBN
	issue.ReaderID = req.ReaderID
	issue.Issue_Approver_ID = req.ApproverID
	issue.Issue_Status = req.RequestStatus
	issue.Issue_Date = req.ApprovalDate

	_, err = db.Exec("INSERT into Issue_registry (Issue_ID,ISBN,ReaderID,Issue_Approver_ID,Issue_Status,Issue_Date,Expected_Return_Date) VALUES (?,?,?,?,?,?,DATE('now','+14 day'))",
		&issue.Issue_ID, &issue.ISBN, &issue.ReaderID, &issue.Issue_Approver_ID, &issue.Issue_Status, &issue.Issue_Date)

	if err != nil {
		log.Println("err4", err)
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reply sent successfully"})
}

func getAllRequests(db *sql.DB, c *gin.Context) {

	result, err := db.Query("Select * FROM Issue_registry")
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get requests"})
		return
	}

	defer result.Close()

	var issues []Issues
	for result.Next() {
		var issue Issues
		err = result.Scan(&issue.Issue_ID, &issue.ISBN, &issue.ReaderID, &issue.Issue_Approver_ID, &issue.Issue_Status, &issue.Issue_Date, &issue.Expected_Return_Date)

		if err != nil {
			log.Println("error is", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get requests"})
			return
		}

		issues = append(issues, issue)
	}

	c.JSON(http.StatusOK, gin.H{"data": issues})
}

//USER

func getBooks(db *sql.DB, c *gin.Context) {
	result, err := db.Query("SELECT * from Book_Inventory")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get books"})
		return
	}

	defer result.Close()

	var books []BookDetail
	for result.Next() {
		var book BookDetail
		err = result.Scan(&book.ISBN, &book.LID, &book.Title, &book.Author, &book.Publisher, &book.Version, &book.TotalCopies, &book.AvailableCopies, &book.BookImage)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get books"})
			return
		}

		books = append(books, book)
	}

	c.JSON(http.StatusOK, gin.H{"data": books})
}

func getOneBook(db *sql.DB, c *gin.Context) {
	// var bookData BookDetail
	Title := c.Param("title")
	log.Println(Title)

	// if err := c.Bind(&bookData); err != nil {
	// 	log.Println("err",err)
	// 	c.JSON(http.StatusBadRequest, gin.H{"error":"Invalid request"})
	// 	return
	// }
	// log.Println(bookData)

	row := db.QueryRow("SELECT * from Book_Inventory where Title = ?", Title)
	var book BookDetail
	err := row.Scan(&book.ISBN, &book.LID, &book.Title, &book.Author, &book.Publisher, &book.Version, &book.TotalCopies, &book.AvailableCopies, &book.BookImage)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find book"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": book})
}

func issueRequest(db *sql.DB, c *gin.Context) {
	var req Request
	if err := c.Bind(&req); err != nil {
		log.Println("err1", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	_, err := db.Exec("INSERT into RequestEvents (ISBN,ReaderID,RequestDate,RequestType) VALUES (?,?,DATE('now'),?)",
		&req.ISBN, &req.ReaderID, &req.RequestType)

	if err != nil {
		log.Println("err2", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Request not added"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Request Sent"})
}



// func sendOTP(to string) {
// 	params := &openapi.CreateVerificationParams{}
// 	params.SetTo(to)
// 	params.SetChannel("sms")

// 	resp, err := client.VerifyV2.CreateVerification(VERIFY_SERVICE_SID, params)
// 	log.Println("OTP", resp)
// 	if err != nil {
// 		fmt.Println("err1", err.Error())
// 	} else {
// 		fmt.Printf("Sent verification '%s'\n", *resp.Sid)
// 	}
// }

// func checkOtp(to string, c *gin.Context) {
// 	getCode := c.Param("otp")
// 	log.Println("code is", getCode)
// 	code, err := strconv.Atoi(getCode)
// 	if err != nil {
// 		log.Println("err1", err)
// 	}
// 	log.Println(code)

// 	session := sessions.Default(c)

// 	// num := session.Get("contact")

// 	// to := fmt.Sprint(num)

// 	params := &openapi.CreateVerificationCheckParams{}
// 	params.SetTo(to)
// 	params.SetCode(getCode)

// 	resp, err := client.VerifyV2.CreateVerificationCheck(VERIFY_SERVICE_SID, params)

// 	if err != nil {
// 		fmt.Println(err.Error())
// 	} else if *resp.Status == "approved" {
// 		fmt.Println("Correct!")

// 		saveRole := session.Get("role")
// 		if saveRole == "Admin" {
// 			// c.JSON(http.StatusOK, gin.H{"message": "Welcome to Admin page"})
// 			c.HTML(200, "adminpage.html", nil)
// 		} else if saveRole == "User" {
// 			// c.JSON(http.StatusOK, gin.H{"message": "This is the users page"})
// 			c.HTML(200, "userpage.html", nil)
// 		}
// 	} else {
// 		fmt.Println("Incorrect!")
// 	}
// }

func logout(c *gin.Context) {
 
    session := sessions.Default(c)
    session.Clear()
    session.Save()
    c.Redirect(http.StatusFound, "/home")
}
