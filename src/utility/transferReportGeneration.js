const transferReportGeneration = ({itemsList, currentResponsible, newResponsible=null}) => {
    const date = new Date().toLocaleDateString();
    const isNew = newResponsible !== null;
    console.log(itemsList, date);

    const reportContent = 
`# Отчет о переносе предметов
Дата: ${date}
Материально ответственный ${isNew ? "(текущий)" : ''}: ${currentResponsible}
${isNew ? `Материально ответственный (новый): ${newResponsible}\n` : ''}
## Список перенесенных предметов
${itemsList.map((item, index) => `- ${index + 1}. ${item}`).join('\n')}`;

    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Transfer_Report_${date.replace(/\./g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);


    return reportContent;
};



export default transferReportGeneration;

