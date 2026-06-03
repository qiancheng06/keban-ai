const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, PageOrientation, LevelFormat, 
        HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// 定义样式
const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" },
          size: 24  // 12pt
        }
      }
    },
    paragraphStyles: [
      { 
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" } },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0, keepNext: false, keepLines: false, alignment: AlignmentType.CENTER }
      },
      { 
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" } },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1, keepNext: false, keepLines: false }
      },
      { 
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" } },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2, keepNext: false, keepLines: false }
      },
      {
        id: "Title", name: "Title", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 44, bold: true, font: { ascii: "Arial", hAnsi: "Arial", eastAsia: "Microsoft YaHei" } },
        paragraph: { spacing: { before: 600, after: 300 }, alignment: AlignmentType.CENTER }
      }
    ]
  },
  numbering: {
    config: [
      { 
        reference: "bullets",
        levels: [{ 
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } 
        }] 
      },
      { 
        reference: "numbers",
        levels: [{ 
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } 
        }] 
      },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({ 
        children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "《大学生创新创业基础》项目策划书", size: 20, color: "666666" })] 
        })] 
      })
    },
    footers: {
      default: new Footer({ 
        children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "第 ", size: 20 }),
            new TextRun({ children: [PageNumber.CURRENT], size: 20 }),
            new TextRun({ text: " 页", size: 20 })
          ]
        })] 
      })
    },
    children: [
      // ===== 封面 =====
      new Paragraph({ spacing: { before: 2000 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "《大学生创新创业基础》", bold: true, size: 36, font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({ spacing: { before: 400 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "项目策划书", bold: true, size: 48, font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({ spacing: { before: 800 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "课伴AI", bold: true, size: 56, color: "2B6CB0", font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "——大学生智能学习与资料整合平台", size: 32, font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({ spacing: { before: 1500 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "项目类型：互联网+创新创业", size: 28, font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({ spacing: { before: 200 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "指导教师：_______________", size: 28, font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({ spacing: { before: 200 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "团队负责人：_______________", size: 28, font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({ spacing: { before: 200 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "联系电话：_______________", size: 28, font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({ spacing: { before: 200 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "2025年5月", size: 28, font: { eastAsia: "Microsoft YaHei" } })]
      }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // ===== 目录 =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("目录")]
      }),
      new Paragraph({ spacing: { before: 200 } }),
      new Paragraph({ children: [new TextRun("一、项目简介...........................................................1")] }),
      new Paragraph({ children: [new TextRun("二、项目背景与问题分析.................................................2")] }),
      new Paragraph({ children: [new TextRun("    2.1 项目背景.......................................................2")] }),
      new Paragraph({ children: [new TextRun("    2.2 社会背景.......................................................2")] }),
      new Paragraph({ children: [new TextRun("    2.3 市场背景.......................................................3")] }),
      new Paragraph({ children: [new TextRun("三、市场分析...........................................................4")] }),
      new Paragraph({ children: [new TextRun("    3.1 市场现状.......................................................4")] }),
      new Paragraph({ children: [new TextRun("    3.2 痛点分析.......................................................4")] }),
      new Paragraph({ children: [new TextRun("    3.3 SWOT分析.....................................................5")] }),
      new Paragraph({ children: [new TextRun("四、解决方案...........................................................6")] }),
      new Paragraph({ children: [new TextRun("    4.1 产品功能.......................................................6")] }),
      new Paragraph({ children: [new TextRun("    4.2 技术架构.......................................................7")] }),
      new Paragraph({ children: [new TextRun("    4.3 创新亮点.......................................................8")] }),
      new Paragraph({ children: [new TextRun("五、商业模式...........................................................9")] }),
      new Paragraph({ children: [new TextRun("    5.1 盈利模式.......................................................9")] }),
      new Paragraph({ children: [new TextRun("    5.2 推广模式.......................................................9")] }),
      new Paragraph({ children: [new TextRun("六、团队介绍与人员分工................................................10")] }),
      new Paragraph({ children: [new TextRun("七、项目总结与展望....................................................11")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // ===== 一、项目简介 =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("一、项目简介")]
      }),
      new Paragraph({
        spacing: { before: 200, after: 200 },
        children: [new TextRun({
          text: '"课伴AI"是一款专为大学生打造的智能学习与资料整合平台，致力于通过人工智能技术解决当代大学生在学习过程中面临的资料分散、学习效率低下、考前焦虑等核心痛点。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '我们的核心理念是"让AI成为每个大学生的专属学习伙伴"。平台通过AI技术实现课堂笔记智能整理、复习提纲自动生成、PPT一键总结、错题智能分析、考试重点预测等功能，帮助大学生摆脱信息碎片化的困扰，建立系统化的学习体系。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '同时，平台创新性地融入学习社交元素，通过AI算法为大学生匹配学习搭子，实现同专业资料共享和互助答疑，构建校园学习社区生态。项目以微信小程序为主要载体，降低使用门槛，让每位大学生都能轻松享受AI技术带来的学习便利。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      // ===== 二、项目背景与问题分析 =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("二、项目背景与问题分析")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.1 项目背景")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '随着人工智能技术的快速发展，AI正在深刻改变教育行业的面貌。ChatGPT、文心一言等大语言模型的出现，为个性化学习提供了全新的技术可能。然而，通用AI工具虽然功能强大，却缺乏针对大学教育场景的专门优化，难以满足大学生群体的特定需求。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '当前，我国高等教育已进入普及化阶段，在校大学生规模超过4700万人。这一庞大的用户群体面临着前所未有的学习压力和竞争挑战。如何在信息爆炸的时代高效学习、如何科学规划学业、如何缓解考前焦虑，成为当代大学生普遍关注的问题。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.2 社会背景")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '当代大学生普遍存在以下学习困境：',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '学习效率低下：面对海量学习资料，缺乏有效的整理和归纳方法，导致学习时间被大量浪费。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '信息碎片化严重：课程PPT、微信群资料、网盘资源分散在不同平台，难以形成完整的知识体系。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '临时抱佛脚现象普遍：平时学习缺乏规划，考前突击导致学习效果差、焦虑情绪严重。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '缺少个性化学习指导：每个人的基础和学习习惯不同，但现有工具无法提供针对性的学习方案。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '学习孤独感：缺乏学习伙伴和互助机制，遇到问题时难以获得及时帮助。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.3 市场背景")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '中国在线教育市场规模持续扩大，2024年预计突破5000亿元。其中，AI+教育细分市场增长迅速，年复合增长率超过30%。大学生作为互联网原住民，对智能化学习工具的接受度和付费意愿都处于较高水平。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '然而，现有市场产品存在明显的空白地带：学习通、雨课堂等平台主要服务于教学管理，缺乏个性化AI辅助功能；ChatGPT等通用AI工具虽然智能，但无法针对大学课程进行专业训练；Notion AI等工具功能强大，但使用门槛较高，不适合普通大学生。这为"课伴AI"提供了巨大的市场机遇。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      // ===== 三、市场分析 =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("三、市场分析")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.1 市场现状")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '当前市场上的学习类应用主要分为以下几类：',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '学习通、雨课堂：以课程管理和在线教学为主，AI功能薄弱', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: 'ChatGPT、文心一言：通用AI能力强，但缺乏校园场景优化', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: 'Notion AI、印象笔记：功能全面但操作复杂，学习成本高', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '百词斩、扇贝单词：垂直领域工具，但功能单一', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.2 痛点分析")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("3.2.1 资料分散问题")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '大学生的课程资料分散在微信群、QQ群、百度网盘、学习通等多个平台，查找困难且容易遗漏。据统计，大学生平均每周花费3-5小时在资料整理和查找上，严重影响学习效率。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("3.2.2 缺少个性化学习")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '每个学生的知识基础、学习能力和目标都不相同，但现有工具往往采用"一刀切"的方式，无法提供针对性的学习建议和内容推荐。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("3.2.3 考前焦虑严重")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '调查显示，超过70%的大学生存在不同程度的考前焦虑。主要原因是平时学习缺乏系统性规划，考前面对大量资料不知从何下手，担心挂科或成绩不理想。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.3 SWOT分析")]
      }),
      // SWOT表格
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [4680, 4680],
        rows: [
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "2B6CB0", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优势 (Strengths)", bold: true, color: "FFFFFF", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "C53030", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "劣势 (Weaknesses)", bold: true, color: "FFFFFF", font: { eastAsia: "Microsoft YaHei" } })] })]
              })
            ]
          }),
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "• 团队由大学生组成，深刻理解用户需求", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 产品定位精准，专注校园垂直场景", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• AI技术门槛降低，开发成本可控", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 微信小程序生态成熟，推广便利", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] })
                ]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "• 前期技术研发投入较大", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 团队缺乏商业化运营经验", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 品牌知名度需要时间积累", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 服务器等基础设施成本", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] })
                ]
              })
            ]
          }),
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "38A169", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "机会 (Opportunities)", bold: true, color: "FFFFFF", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "D69E2E", type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "威胁 (Threats)", bold: true, color: "FFFFFF", font: { eastAsia: "Microsoft YaHei" } })] })]
              })
            ]
          }),
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "• 大学生群体规模庞大，市场潜力大", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• AI教育政策支持力度加大", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 智慧校园建设加速推进", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 大学生付费意愿逐年提升", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] })
                ]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "• 互联网大厂可能入局教育赛道", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 同类产品竞争加剧", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• AI技术迭代快，需持续投入", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "• 用户获取成本上升", font: { eastAsia: "Microsoft YaHei" }, size: 22 })] })
                ]
              })
            ]
          })
        ]
      }),
      
      // ===== 四、解决方案 =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("四、解决方案")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.1 产品功能")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '"课伴AI"平台核心功能模块包括：',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("4.1.1 AI智能笔记整理")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '支持上传课堂PPT、PDF课件、课堂录音等多种格式，AI自动提取关键知识点，生成结构化笔记。支持高数、大学英语、机械制图、工程管理、计算机基础等各专业课程的智能解析。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("4.1.2 智能复习提纲生成")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '根据课程大纲和历史考试数据，AI自动生成重点复习提纲，标注高频考点和易错点，帮助学生高效备考。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("4.1.3 错题智能分析")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '拍照上传错题，AI自动识别题目内容，分析错误原因，推荐相关知识点和练习题，实现精准查漏补缺。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("4.1.4 学习搭子匹配")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '基于专业、课程、学习目标等维度，AI智能推荐学习伙伴，支持组建学习小组、共享资料、互助答疑，打造校园学习社区。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("4.1.5 个性化学习计划")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '根据用户的学习目标、时间安排和知识掌握情况，AI生成个性化学习计划，并提供学习提醒和进度追踪功能。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.2 技术架构")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '平台采用前后端分离架构，主要技术栈包括：',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '前端：微信小程序框架，支持iOS和Android双平台', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '后端：Node.js + Express，RESTful API设计', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '数据库：MongoDB存储用户数据，Redis缓存热点数据', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: 'AI引擎：调用GPT-4/文心一言API，结合RAG技术构建校园知识库', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '云服务：阿里云/腾讯云部署，支持弹性扩容', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.3 创新亮点")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '本项目三大核心创新点：',
          font: { eastAsia: "Microsoft YaHei" }, bold: true
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '创新点一：校园垂直AI模型。不同于通用AI工具，我们针对大学课程体系进行专门训练，构建覆盖各专业的校园知识图谱，提供更精准的学习辅助。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '创新点二：AI+学习社交融合。将智能推荐算法应用于学习伙伴匹配，打破传统学习软件的孤立模式，构建互助学习社区，提升用户粘性和学习效果。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '创新点三：碎片化知识整合。通过AI技术自动整合分散在各平台的课程资料，生成结构化的知识体系，帮助学生摆脱信息碎片化困扰，实现系统化学习。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      
      // ===== 五、商业模式 =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("五、商业模式")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.1 盈利模式")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '平台采用"免费+增值"的商业模式：',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '会员订阅：基础功能免费，高级AI功能（如无限次笔记整理、深度错题分析）采用月度/年度会员制，预计定价9.9元/月或69元/年。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '校园推广合作：与教材出版社、在线教育平台合作，获取推广佣金。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '广告收入：在免费版本中展示教育类精准广告，如考研辅导、留学服务等。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({ text: '企业版服务：面向高校提供定制化智慧教学解决方案，拓展B端市场。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.2 推广模式")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '采用线上线下相结合的推广策略：',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '小红书/抖音：发布学习技巧、备考经验等短视频内容，吸引目标用户关注。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '校园代理：在各高校招募学生代理，通过地推、社团合作等方式进行推广。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '口碑传播：通过优质产品体验激发用户自发分享，形成裂变传播。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: '校园活动：举办学习打卡挑战、笔记大赛等活动，提升品牌知名度。', font: { eastAsia: "Microsoft YaHei" } })]
      }),
      
      // ===== 六、团队介绍与人员分工 =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("六、团队介绍与人员分工")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '本项目团队由5名来自不同专业的在校大学生组成，具备互补的技能背景和共同的创业热情。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      // 团队表格
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [2000, 2000, 5360],
        rows: [
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                shading: { fill: "2B6CB0", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "姓名", bold: true, color: "FFFFFF", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                shading: { fill: "2B6CB0", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "职责", bold: true, color: "FFFFFF", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 5360, type: WidthType.DXA },
                shading: { fill: "2B6CB0", type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "具体工作内容", bold: true, color: "FFFFFF", font: { eastAsia: "Microsoft YaHei" } })] })]
              })
            ]
          }),
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "成员A", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "项目负责人", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 5360, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: "统筹项目整体进度，协调团队分工，负责产品规划与需求分析", font: { eastAsia: "Microsoft YaHei" } })] })]
              })
            ]
          }),
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "成员B", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "技术开发", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 5360, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: "负责小程序前端开发、后端API设计与实现、AI接口对接", font: { eastAsia: "Microsoft YaHei" } })] })]
              })
            ]
          }),
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "成员C", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "市场调研", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 5360, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: "负责市场调研、竞品分析、用户访谈、数据收集与分析", font: { eastAsia: "Microsoft YaHei" } })] })]
              })
            ]
          }),
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "成员D", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "运营推广", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 5360, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: "负责新媒体运营、内容创作、校园推广活动策划与执行", font: { eastAsia: "Microsoft YaHei" } })] })]
              })
            ]
          }),
          new TableRow({
            cantSplit: true,
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "成员E", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 2000, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "文案策划", font: { eastAsia: "Microsoft YaHei" } })] })]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }, right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                width: { size: 5360, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ children: [new TextRun({ text: "负责项目文档撰写、商业计划书编写、宣传材料设计", font: { eastAsia: "Microsoft YaHei" } })] })]
              })
            ]
          })
        ]
      }),
      
      // ===== 七、项目总结与展望 =====
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("七、项目总结与展望")]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '"课伴AI"项目立足于当代大学生的学习痛点，以人工智能技术为核心驱动力，致力于打造一个真正懂学生、服务学生的智能学习平台。项目具有以下核心价值：',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '教育价值：通过AI技术降低学习门槛，帮助更多学生掌握高效学习方法，提升学业成绩，缓解学习焦虑，促进教育公平。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '社会价值：响应国家智慧教育战略，推动AI技术在教育领域的落地应用，为构建学习型社会贡献力量。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '商业价值：瞄准千亿级在线教育市场，以差异化定位和创新模式，具备可观的市场前景和盈利潜力。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [new TextRun({
          text: '展望未来，我们将持续优化产品功能，拓展服务场景，力争在三年内覆盖全国1000所高校，服务超过500万大学生，成为中国大学生最信赖的AI学习伙伴。同时，我们也将积极探索与高校、教育机构的深度合作，推动智慧校园建设，让AI技术真正惠及每一位学子。',
          font: { eastAsia: "Microsoft YaHei" }
        })]
      }),
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [new TextRun({
          text: '让学习更高效，让成长更轻松——这是"课伴AI"的初心，也是我们不懈追求的目标。',
          font: { eastAsia: "Microsoft YaHei" }, bold: true
        })]
      })
    ]
  }]
});

// 生成文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("c:\\Users\\33831\\Desktop\\dachuang\\课伴AI_项目策划书.docx", buffer);
  console.log("文档生成成功！");
});
