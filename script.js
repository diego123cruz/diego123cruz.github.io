
function decimalToHexadecimal(decimalNumber) {
  if (isNaN(decimalNumber) || decimalNumber < 0 || decimalNumber > 65535) {
    return "O número deve estar entre 0 e 65535.";
  }

  const hexadecimal = decimalNumber.toString(16).toUpperCase();
  const paddedHexadecimal = ("0000" + hexadecimal).slice(-4);

  return "0x" + paddedHexadecimal.substr(0, 2) + ", 0x" + paddedHexadecimal.substr(2, 2);
}


// Função para converter um byte em formato hexadecimal com '0x' no início
function byteToHex(byte) {
  return '0x' + ('00' + byte.toString(16)).slice(-2);
}

// Função para ler o arquivo selecionado pelo usuário
function handleFile(file) {
  const reader = new FileReader();

  reader.onload = function (event) {

    document.getElementById("inputHex").value = event.target.result;
  };

  reader.readAsText(file);
}

function textToHexadecimal(text) {
  if (typeof text !== "string" || text.length > 16) {
    return "O texto deve ser uma string com no máximo 16 letras.";
  }

  let hexString = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i).toString(16).toUpperCase();
    const paddedCharCode = ("00" + charCode).slice(-2);
    hexString += "0x" + paddedCharCode + ", ";
  }

  // Preenche com "0x00" caso o texto tenha menos de 16 letras
  while (hexString.length < 16 * 6 - 2) {
    hexString += "0x00, ";
  }

  return hexString.substr(0, 16 * 6 - 2);
}

var saidaCodHex = "";
var saidaCodSize = "";
var saidaCodName = "";

function convertTextToHex(append) {
  const inputText = document.getElementById("inputText").value;
  const hexadecimalResult = textToHexadecimal(inputText);
  saidaCodName = hexadecimalResult;











  const content = document.getElementById("inputHex").value;
  const lines = content.split('\n');
  const hexOutput = [];

  lines.forEach(line => {
    if (line.startsWith(':')) {
      const data = line.slice(1); // Remover o caractere ':' do início da linha
      const byteCount = parseInt(data.slice(0, 2), 16);
      const address = parseInt(data.slice(2, 6), 16);
      const recordType = parseInt(data.slice(6, 8), 16);
      
      if (recordType === 0) { // Verificar se é um registro de dados
        for (let i = 0; i < byteCount; i++) {
          const byte = parseInt(data.slice(8 + i * 2, 10 + i * 2), 16);
          hexOutput.push(byteToHex(byte));

        }
      }
    }
  });

  console.log(hexOutput.join(', '));
  saidaCodHex = hexOutput;

  const buffer = hexOutput.slice(",");
  const byteCount = buffer.length;
  const counthex = decimalToHexadecimal(byteCount);
  
  console.log(" size:", counthex);
  saidaCodSize = counthex;







  if (append) {
    document.getElementById("outputHex").value += ",0x44,"+saidaCodName+",0x00,"+saidaCodSize+","+saidaCodHex+",0x4F";
  } else {
    document.getElementById("outputHex").value = "0x44,"+saidaCodName+",0x00,"+saidaCodSize+","+saidaCodHex+",0x4F";
  }
  
}



const inputFile = document.getElementById('fileInput');
 inputFile.addEventListener('change', function (event) {
   const file = event.target.files[0];
   handleFile(file);
 });

 function clean_hex(input, remove_0x) {
  input = input.toUpperCase();
  
  if (remove_0x) {
    input = input.replace(/0x/gi, "");        
  }
  
  var orig_input = input;
  input = input.replace(/[^A-Fa-f0-9]/g, "");
  if (orig_input != input)
      //alert ("Warning! Non-hex characters (including newlines) in input string ignored.");
  return input;    
} 

function Convert() {
var cleaned_hex = clean_hex(document.frmConvert.hex.value, true);
var filename = document.frmConvert.filename.value;	  
//document.frmConvert.cleaned_hex.value = cleaned_hex;
if (cleaned_hex.length % 2) {
  alert ("Error: cleaned hex string length is odd.");     
  return;
}

var binary = new Array();
for (var i=0; i<cleaned_hex.length/2; i++) {
  var h = cleaned_hex.substr(i*2, 2);
  binary[i] = parseInt(h,16);        
}

// Download .txt
const text = document.getElementById("outputHex").value;
const blob = new Blob([text], { type: "text/plain" });

const aTxt = document.createElement("a");
aTxt.href = URL.createObjectURL(blob);
aTxt.download = filename+".txt";

// Append anchor to body.
document.body.appendChild(aTxt)
aTxt.click();

// Remove anchor from body
document.body.removeChild(aTxt)     




// Download .bin
var byteArray = new Uint8Array(binary);
var a = window.document.createElement('a');

a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
a.download = filename;

// Append anchor to body.
document.body.appendChild(a)
a.click();

// Remove anchor from body
document.body.removeChild(a)        
} 