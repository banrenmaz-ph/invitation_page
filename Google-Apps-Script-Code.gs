// Google Apps Script代码
// 部署步骤：
// 1. 创建新的Google Sheet: https://sheets.new
// 2. 点击 Extensions > Apps Script
// 3. 复制下面的代码到Code.gs
// 4. 点击 Deploy > New deployment
// 5. 选择类型: Web app
// 6. Execute as: Me (你的邮箱)
// 7. Who has access: Anyone (任何人都可以访问)
// 8. 点击Deploy，复制Web app URL
// 9. 将URL粘贴到script.js的GOOGLE_SCRIPT_URL变量中

function doPost(e) {
  try {
    // 解析POST数据
    var data = JSON.parse(e.postData.contents);

    // 获取活动表格
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 添加表头（如果是第一次提交）
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['提交时间', '姓名', '联系电话', '携带人数', '留言']);
      // 设置表头样式
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold')
        .setBackground('#667eea')
        .setFontColor('#ffffff')
        .setFontSize(12);
    }

    // 添加新行数据
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
      data.name || '',
      data.phone || '',
      data.guests || '0',
      data.message || ''
    ]);

    // 设置自动调整列宽
    sheet.autoResizeColumns(1, 5);

    // 设置偶数行背景色（提高可读性）
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      if (lastRow % 2 === 0) {
        sheet.getRange(lastRow, 1, 1, 5).setBackground('#f8f9fa');
      }
    }

    // 返回成功响应
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': '数据已成功添加到表格'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 返回错误响应
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 可选：测试函数，可以直接在Apps Script编辑器中运行
function testDoPost() {
  var testData = {
    timestamp: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
    name: '测试用户',
    phone: '13800138000',
    guests: '2',
    message: '这是一条测试数据'
  };

  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  doPost(e);
}

// 可选：清除所有数据（保留表头）
function clearData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).clearContent();
  }
}

// 可选：设置表格格式
function formatSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 设置表头
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['提交时间', '姓名', '联系电话', '携带人数', '留言']);
  }

  // 设置表头样式
  sheet.getRange(1, 1, 1, 5)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff')
    .setFontSize(12)
    .setHorizontalAlignment('center');

  // 设置列宽
  sheet.setColumnWidth(1, 180); // 提交时间
  sheet.setColumnWidth(2, 120); // 姓名
  sheet.setColumnWidth(3, 140); // 联系电话
  sheet.setColumnWidth(4, 100); // 携带人数
  sheet.setColumnWidth(5, 300); // 留言

  // 冻结首行
  sheet.setFrozenRows(1);
}
