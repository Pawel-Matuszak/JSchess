import Piece from "./piece";

class Board{
  constructor(){
    this.board = [];
    this.boardDiv;
  }

  createBoard(){
    this.boardDiv = document.createElement("div");
    this.boardDiv.setAttribute("class", "board");
  
    //draw board in html
    for (let i = 0; i <= 7; i++) {
      const row = document.createElement("div");
      row.setAttribute("class", "row");
      this.board.push([]);

      for (let j = 0; j <= 7; j++) {

        const square = document.createElement('div');
        square.setAttribute("class", `${j}${i} square`);
        square.style.background = ((j+1+i+1)%2==0) ? "#F0D29E" : "#996542";

        this.board[i].push("");
        row.appendChild(square);
      }
  
      this.boardDiv.appendChild(row);
    }

    document.body.appendChild(this.boardDiv);
  }

  drawBoard(){
    this.board.forEach(arr=>{
      arr.forEach(e=>{
        if(e.type==="r" || e.type==="R" || e.type==="n" || e.type==="N" || e.type==="b" || e.type==="B" 
        || e.type==="k" || e.type==="K" || e.type==="k" || e.type==="q" || e.type==="Q" || e.type==="p" || e.type==="P"){
          e.pieceDiv.style.left = e.pos.x*100 + "px";
          e.pieceDiv.style.top = e.pos.y*100 + "px";
          this.boardDiv.appendChild(e.pieceDiv);
        }
      })
    })
  }

  readFEN(fenStr){
    // let fenArray = fenStr.split("/");
    // this.board = [];
    // console.log(fenArray);

    // for (let i = 0; i <= 7; i++) {
    //   this.board.push([]);

    //   for (let j = 0; j <= 7; j++) {
    //     if(this.board[i].length>=8) break;
    //     let fenChar = fenArray[i][j]

    //     console.log(fenChar);
    //     console.log(this.board);
        
    //     if(fenChar > 0 && fenChar < 9){
    //       for (let a = 0; a < fenChar; a++) {
    //         this.board[i].push("-");
    //       }

    //     }else{
    //       let newPiece = new Piece(fenChar, j, i, (fenChar.toLowerCase()==fenChar) ? false : true);
    //       newPiece.createPiece(this);
    //       this.board[i].push(newPiece);
    //     }
    //   }
    // }
    // this.drawBoard();
    let fenArray = fenStr.split("/");
    this.board = [];
    console.log(fenArray);

    //create empty board
    for (let i = 0; i <= 7; i++) {
      this.board.push([]);
    }

    //fill board with pieces
    let rowNum = 0;
    fenArray.forEach(row=>{
      [...row].forEach(e=>{
        if(this.board[rowNum].length>8) return;

        if(e>0 && e<9){
          for (let i = 0; i < e; i++) {
            this.board[rowNum].push('-');
          }
        }else{
          let newPiece = new Piece(e, this.board[rowNum].length, rowNum, (e.toLowerCase()==e) ? false : true);
          newPiece.createPiece(this);
          // this.board[rowNum].push(newPiece);
        }
      })
      rowNum++;
    })

    this.drawBoard();
  }
}

export default Board;