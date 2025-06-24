const umapTemplate = `
# UMAP 示例
library(umap)

set.seed(123)
data <- matrix(rnorm(\${param1}), ncol = \${param2})

result <- umap(data)

png("output.png")
plot(result\$layout, main = "UMAP 维度缩减", col = "blue", pch = 19)
dev.off()
`;

export default umapTemplate;
