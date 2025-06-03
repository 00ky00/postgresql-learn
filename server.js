const express = require("express");
const pool = require("./db");
const app = express();
const PORT = 5000;

// app.get("/",(req,res)=>{
//     res.send("hello express");
// });


//jsonを使うにはミドルウェアの設定が必要
app.use(express.json());

+

//特定のユーザー情報を取得するapi
app.get("/users/:id",(req,res)=>{
    const id = req.params.id;
    pool.query("SELECT *FROM users WHERE id=$1",[id],(error,results)=>{    //$1=[id]
        if(error) throw error;
        return res.status(200).json(results.rows);
    });
});

//ユーザーを追加する
app.post("/users", (req,res)=>{
    const {name,email,age} = req.body;
    //ユーザーがすでに存在するかを確認
    pool.query("SELECT s FROM users s WHERE s.email = $1",
 [email],
 (error,results)=>{
if(results.rows.lenght){
   return  res.send("すでにユーザーが存在しています。");
}
pool.query("INSERT INTO users(name,email,age) values($1,$2,$3)",[name,email,age],(error,results)=>{
    if(error) throw error;
    res.status(201).send("ユーザー作成に成功しました");
});
    }
);
});

//ユーザーを削除
app.delete("/users/:id",(req,res)=>{
    const id = req.params.id;
    pool.query("SELECT * FROM users WHERE id=$1",[id],(error,results)=>{    
    
        const isUserExised = results.rows.length; //results.rows.length = 文字を取得する
        if(!isUserExised) {
            return res.send("ユーザーが存在しません") //!isUserExised=もしユーザーがいなかったら
        }
    pool.query("DELETE FROM users WHERE id=$1",[id],(error,results)=>{    
        if(error) throw error;

        return res.status(200).send("削除に成功しました");
    });
        
    });
});

//ユーザーを更新する
app.put("/users/:id",(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    pool.query("SELECT *FORM users WHERE id=$1",[id],(error,results)=>{    
    
        const isUserExised = results.rows.length; //results.rows.length = 文字を取得する
        if(!isUserExised) {
            return res.send("ユーザーが存在しません") //!isUserExised=もしユーザーがいなかったら
        }
    pool.query("UPDATE  users SET name =$1 WHERE id =$2",[name],(error,results)=>{    
        if(error) throw error;

        return res.status(200).send("更新ー＠に成功しました");
    });
        
    });
});




app.listen(PORT,()=>{
    console.log("server is running on PORT"+ PORT);
});