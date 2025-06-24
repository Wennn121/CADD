const boxplotTemplate = (param1, param2) => {
  const p1 = param1 !== undefined && param1 !== '' ? param1 : 10;
  const p2 = param2 !== undefined && param2 !== '' ? param2 : 5;
  return `
library(ggplot2)

data <- data.frame(
  group = c("A", "A", "B", "B"),
  value = c(${p1}, ${p2}, 6, 7)
)

ggplot(data, aes(x = group, y = value)) +
  geom_boxplot(fill = "skyblue", color = "black") +
  theme_minimal() +
  ggtitle("Boxplot")

ggsave("output.png")
print(getwd())
print(file.exists("output_1750642801622.png"))
`;
};
export default boxplotTemplate;
