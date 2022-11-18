export const codificar = (input: string) => {
  let output = ''
  const upperInput = input.toUpperCase()
  for (let i = 0; i < upperInput.length; i++) {
    const char = upperInput.charAt(i)
    let newChar = ''

    switch (char) {
      case 'A':
        newChar = '´'
        break
      case 'I':
        newChar = '¼'
        break
      case 'Q':
        newChar = 'Ä'
        break
      case 'Y':
        newChar = 'Ë'
        break
      case '7':
        newChar = 'Ó'
        break
      case 'Ã':
        newChar = '#'
        break
      case '[':
        newChar = '_'
        break
      case '°':
        newChar = '>'
        break
      case 'B':
        newChar = 'µ'
        break
      case 'J':
        newChar = '½'
        break
      case 'R':
        newChar = 'Å'
        break
      case 'Z':
        newChar = 'Ì'
        break
      case '8':
        newChar = 'Ô'
        break
      case 'Ç':
        newChar = '°'
        break
      case ']':
        newChar = '|'
        break
      case 'º':
        newChar = 'G'
        break

      case 'C':
        newChar = '¶'
        break
      case 'K':
        newChar = '¾'
        break
      case 'S':
        newChar = 'Æ'
        break
      case '1':
        newChar = 'Í'
        break
      case '9':
        newChar = 'Õ'
        break
      case "'":
        newChar = '±'
        break
      case '{':
        newChar = '@'
        break
      case '%':
        newChar = 'T'
        break
      case 'D':
        newChar = '·'
        break
      case 'L':
        newChar = '¿'
        break
      case 'T':
        newChar = 'Ç'
        break
      case '2':
        newChar = 'Î'
        break
      case '0':
        newChar = 'Ö'
        break
      case '+':
        newChar = 'Ý'
        break
      case '}':
        newChar = ';'
        break
      case 'É':
        newChar = '*'
        break

      case 'E':
        newChar = '¸'
        break
      case 'M':
        newChar = 'À'
        break
      case 'U':
        newChar = 'È'
        break
      case '3':
        newChar = 'Ï'
        break
      case ' ':
        newChar = '×'
        break
      case '"':
        newChar = '÷'
        break
      case '´':
        newChar = '='
        break
      case 'Á':
        newChar = 'N'
        break

      case 'F':
        newChar = '¹'
        break
      case 'N':
        newChar = 'Á'
        break
      case 'V':
        newChar = 'É'
        break
      case '4':
        newChar = 'Ð'
        break
      case '&':
        newChar = 'Ø'
        break
      case '(':
        newChar = 'ÿ'
        break
      case 'Õ':
        newChar = '$'
        break
      case '/':
        newChar = '²'
        break
      case 'G':
        newChar = 'º'
        break
      case 'O':
        newChar = 'Â'
        break
      case 'X':
        newChar = 'Ê'
        break
      case '5':
        newChar = 'Ñ'
        break
      case '-':
        newChar = 'Ù'
        break
      case ')':
        newChar = 'þ'
        break
      case ':':
        newChar = 'á'
        break
      case '<':
        newChar = '¤'
        break
      case 'H':
        newChar = '»'
        break
      case 'P':
        newChar = 'Ã'
        break
      case 'W':
        newChar = 'Ü'
        break
      case '6':
        newChar = 'Ò'
        break
      case '.':
        newChar = 'Ú'
        break
      case ',':
        newChar = 'Û'
        break
      case '\\':
        newChar = 'ß'
        break

      default:
        break
    }
    output = output.concat(newChar)
  }
  return output
}

export const restaurar = (inp: string | null) => {
  const input = inp || ''
  let output = ''
  // const upperInput = input.toUpperCase()
  const upperInput = input
  for (let i = 0; i < upperInput.length; i++) {
    const char = upperInput.charAt(i)
    let newChar = ''

    switch (char) {
      case '´':
        newChar = 'A'
        break
      case '¼':
        newChar = 'I'
        break
      case 'Ä':
        newChar = 'Q'
        break
      case 'Ë':
        newChar = 'Y'
        break
      case 'Ó':
        newChar = '7'
        break
      case '#':
        newChar = 'Ã'
        break
      case '_':
        newChar = '['
        break
      case '>':
        newChar = '°'
        break
      case 'µ':
        newChar = 'B'
        break
      case '½':
        newChar = 'J'
        break
      case 'Å':
        newChar = 'R'
        break
      case 'Ì':
        newChar = 'Z'
        break
      case 'Ô':
        newChar = '8'
        break
      case '°':
        newChar = 'Ç'
        break
      case '|':
        newChar = ']'
        break
      case 'G':
        newChar = 'º'
        break

      case '¶':
        newChar = 'C'
        break
      case '¾':
        newChar = 'K'
        break
      case 'Æ':
        newChar = 'S'
        break
      case 'Í':
        newChar = '1'
        break
      case 'Õ':
        newChar = '9'
        break
      case '±':
        newChar = "'"
        break
      case '@':
        newChar = '{'
        break
      case 'T':
        newChar = '%'
        break
      case '·':
        newChar = 'D'
        break
      case '¿':
        newChar = 'L'
        break
      case 'Ç':
        newChar = 'T'
        break
      case 'Î':
        newChar = '2'
        break
      case 'Ö':
        newChar = '0'
        break
      case 'Ý':
        newChar = '+'
        break
      case ';':
        newChar = '}'
        break
      case '*':
        newChar = 'É'
        break

      case '¸':
        newChar = 'E'
        break
      case 'À':
        newChar = 'M'
        break
      case 'È':
        newChar = 'U'
        break
      case 'Ï':
        newChar = '3'
        break
      case '×':
        newChar = ' '
        break
      case '÷':
        newChar = '"'
        break
      case '=':
        newChar = '´'
        break
      case 'N':
        newChar = 'Á'
        break

      case '¹':
        newChar = 'F'
        break
      case 'Á':
        newChar = 'N'
        break
      case 'É':
        newChar = 'V'
        break
      case 'Ð':
        newChar = '4'
        break
      case 'Ø':
        newChar = '&'
        break
      case 'ÿ':
        newChar = '('
        break
      case '$':
        newChar = 'Õ'
        break
      case '²':
        newChar = '/'
        break
      case 'º':
        newChar = 'G'
        break
      case 'Â':
        newChar = 'O'
        break
      case 'Ê':
        newChar = 'X'
        break
      case 'Ñ':
        newChar = '5'
        break
      case 'Ù':
        newChar = '-'
        break
      case 'þ':
        newChar = ')'
        break
      case 'á':
        newChar = ':'
        break
      case '¤':
        newChar = '<'
        break
      case '»':
        newChar = 'H'
        break
      case 'Ã':
        newChar = 'P'
        break
      case 'Ü':
        newChar = 'W'
        break
      case 'Ò':
        newChar = '6'
        break
      case 'Ú':
        newChar = '.'
        break
      case 'Û':
        newChar = ','
        break
      case 'ß':
        newChar = '\\'
        break

      default:
        newChar = char
        break
    }

    output = output.concat(newChar)
  }
  return output
}

export async function testarSenha(
  hashedPassword: string,
  inputPassword: string
) {
  // const inputCripto = codificar(inputPassword)
  // console.log('hashpass', hashedPassword)
  // console.log('inputpass', inputCripto)
  // const match = hashedPassword === inputCripto

  //provisorio ate decidir criptografia bd

  const senhaDecodificada = restaurar(hashedPassword)
  const match =
    senhaDecodificada.trimEnd() === inputPassword.toLocaleUpperCase()

  return match
}

// Function Restaurar(vA_)
// Local b:="",c:=""
// For nConRes:=1 To Len(vA_)
//    c:=Upper(SubStr(vA_,nConRes,1))
//    b+=If(c=="´","A",If(c=="µ","B",If(c=="¶","C",If(c=="·","D",If(c=="¸","E",If(c=="¹","F",If(c=="º","G",If(c=="»","H",;
//       If(c=="¼","I",If(c=="½","J",If(c=="¾","K",If(c=="¿","L",If(c=="À","M",If(c=="Á","N",If(c=="Â","O",If(c=="Ã","P",;
//       If(c=="Ä","Q",If(c=="Å","R",If(c=="Æ","S",If(c=="Ç","T",If(c=="È","U",If(c=="É","V",If(c=="Ê","X",If(c=="Ü","W",;
//       If(c=="Ë","Y",If(c=="Ì","Z",If(c=="Í","1",If(c=="Î","2",If(c=="Ï","3",If(c=="Ð","4",If(c=="Ñ","5",If(c=="Ò","6",;
//       If(c=="Ó","7",If(c=="Ô","8",If(c=="Õ","9",If(c=="Ö","0",If(c=="×"," ",If(c=="Ø","&",If(c=="Ù","-",If(c=="Ú",".",;
//       If(c=="#","Ã",If(c=="°","Ç",If(c=="±","'",If(c=="Ý","+",If(c=="÷",'"',If(c=="ÿ","(",If(c=="þ",")",If(c=="Û",",",;
//       If(c=="_","[",If(c=="|","]",If(c=="@","{",If(c==";","}",If(c=="=","´",If(c=="$","Õ",If(c=="á",":",If(c=="ß","\",;
//       If(c==">","°",If(c=="G","º",If(c=="T","%",If(c=="*","É",If(c=="N","Á",If(c=="²","/",If(c=="¤","<"," ")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
// Next
// Return(b)
