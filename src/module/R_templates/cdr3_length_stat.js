const cdr3LengthStatTemplate = (input, output) => `
# -------------------------------
# 统计抗体序列中 CDR3 重链长度分布
# -------------------------------

library(ggplot2)
library(dplyr)
library(stringr)
library(readr)


input_file <- "${input}"
output_file <- ifelse("${output}" == "" || is.na("${output}"), "Output/OAS_cdr3_length.png", "${output}")
data <- read_csv(input_file, locale = locale(encoding = "UTF-8"))
print(colnames(data))
dir.create(dirname(output_file), recursive = TRUE, showWarnings = FALSE)

if (!file.exists(input_file)) stop(paste("输入文件不存在：", input_file))
data <- read.csv(input_file, stringsAsFactors = FALSE, fileEncoding = "UTF-8")
colnames(data) <- gsub('^"|"$', '', colnames(data))
if (!"cdr3_aa_heavy" %in% colnames(data)) stop("数据中不包含列 'cdr3_aa_heavy'")
data <- data %>% mutate(cdr3_aa_heavy_length = str_length(cdr3_aa_heavy))

p <- ggplot(data, aes(x = cdr3_aa_heavy_length)) +
  geom_bar(stat = 'count', fill = "#3182bd") +
  labs(title = "CDR3 重链长度分布", x = "CDR3 氨基酸长度", y = "序列数量") +
  theme_linedraw()

ggsave(filename = output_file, plot = p, width = 7, height = 5, dpi = 300)
`;

export default cdr3LengthStatTemplate;
