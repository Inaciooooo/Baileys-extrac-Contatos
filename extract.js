const vCardsJS = require('vcards-js');
const archiver = require('archiver');
case 'extrair':
  
  
  try {
    // Verifica se a pasta 'contatos' existe, caso contrário, cria a pasta
    const folderPath = 'contatos';
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const vCards = [];
    let vCardsText = '';
    let contatos = '';

    for (let mem of groupMembers) {
      const vCard = vCardsJS();

      const phoneNumber = mem.id.split('@')[0];
      const name = phoneNumber;

      vCard.version = '2.1';
      vCard.firstName = phoneNumber;
      vCard.cellPhone = phoneNumber;

      vCards.push(vCard);
      vCardsText += vCard.getFormattedString() + '\n';
      contatos += `${phoneNumber}\n`;
    }

    const vcfPath = `${folderPath}/contatos.vcf`;
    fs.writeFileSync(vcfPath, vCardsText);

    // Enviar o arquivo VCF diretamente
    conn.sendMessage(sender, { document: fs.readFileSync(vcfPath), mimetype: 'text/vcard', fileName: 'Abra com o app CONTATOS.vcf' }, { quoted: info });

    // Remover arquivo temporário
    fs.unlinkSync(vcfPath);

  } catch (error) {
    console.error(error);
    reply(`Ocorreu um erro ao processar a solicitação. ${error}`);
  }
  
  break
