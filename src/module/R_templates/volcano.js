const volcano = `
# Volcano plot 示例
library(ggplot2)

data <- data.frame(
  log2FC = rnorm(100),
  negLogP = -log10(runif(100))
)

ggplot(data, aes(x = log2FC, y = negLogP)) +
  geom_point(color = "grey") +
  geom_hline(yintercept = 1.3, color = "red", linetype = "dashed") +
  geom_vline(xintercept = c(-1, 1), color = "red", linetype = "dashed") +
  theme_minimal()

ggsave("output.png", width = 6, height = 4)
`;

export default volcano;
