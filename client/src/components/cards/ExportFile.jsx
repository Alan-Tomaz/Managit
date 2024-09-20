import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export const exportToImage = (ref) => {
    const originalDiv = ref.current;

    // Clonar o elemento e remover a rolagem
    const clonedDiv = originalDiv.cloneNode(true);
    clonedDiv.style.height = 'auto';
    clonedDiv.style.overflow = 'visible';
    clonedDiv.style.position = 'absolute';  // Retirar da tela
    clonedDiv.style.left = '-9999px';
    document.body.appendChild(clonedDiv);  // Adicionar ao body (fora da tela)

    html2canvas(clonedDiv, {
        scale: window.devicePixelRatio, // Escalar a captura para a densidade de pixels do dispositivo
        width: clonedDiv.scrollWidth,  // Usar a largura total do elemento
        height: clonedDiv.scrollHeight // Usar a altura total do elemento
    }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'data.png';
        link.click();  // Baixa a imagem automaticamente

        document.body.removeChild(clonedDiv);
    });
};

export const exportToExcel = (data) => {

    /* New names of columns */
    const columnMapping = {
        image: "Image",
        number: "Number",
        username: "Username",
        permission: "Permission",
        creationDate: "Creation Date",
        lastAccess: "Last Access",
        blocked: "Blocked",
        productName: "Product Name",
        categoryName: "Category",
        supplierName: "Supplier",
        code: "Code",
        quantity: "Quantity",
        sellPrice: "Sell Price",
        buyPrice: "Buy Price",
        date: "Date",
        description: "Description",
        status: "Status",
        order: "Order"
    };

    const transformedData = data.map(item => {
        const newItem = {};

        // Percorre as chaves do mapeamento e define os novos nomes de coluna
        for (const key in columnMapping) {
            if (item.hasOwnProperty(key)) {
                const newKey = columnMapping[key]; // Nome personalizado da coluna
                newItem[newKey] = item[key]; // Valor da propriedade original
            }
        }

        return newItem;
    });

    const workSheet = XLSX.utils.json_to_sheet(transformedData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    XLSX.writeFile(workBook, 'data.xlsx'); // Salva e faz o download do arquivo
};


export const exportToPDF = (ref) => {
    const originalDiv = ref.current;

    // Clonar o elemento e remover a rolagem
    const clonedDiv = originalDiv.cloneNode(true);
    clonedDiv.style.height = 'auto';
    clonedDiv.style.overflow = 'visible';
    clonedDiv.style.position = 'absolute';  // Retirar da tela
    clonedDiv.style.left = '-9999px';
    document.body.appendChild(clonedDiv);  // Adicionar ao body (fora da tela)

    html2canvas(clonedDiv, {
        scale: window.devicePixelRatio, // Escalar a captura para a densidade de pixels do dispositivo
        width: clonedDiv.scrollWidth,  // Usar a largura total do elemento
        height: clonedDiv.scrollHeight // Usar a altura total do elemento
    }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210;  // Largura A4 em mm
        const pageHeight = 297; // Altura A4 em mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;  // Redimensionando proporcionalmente
        let heightLeft = imgHeight;
        let position = 0;

        // Adiciona a primeira parte da imagem na primeira página
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Adiciona páginas subsequentes para o restante da imagem
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("data.pdf");

        document.body.removeChild(clonedDiv);
    });
};