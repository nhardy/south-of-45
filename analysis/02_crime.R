

## burgerlary
burg <- read.csv("burglaries_by_mb.csv")
burger <- burg %>% group_by(AU2013_code) %>%
  summarise(burgs = sum(total)) %>% ungroup() %>%
  filter(AU2013_code %in% dunedinAUs)
AUinreg <- concordance %>% select(AU2013_code, dn_ql) %>% distinct()
burger <- merge(burger, AUinreg, by="AU2013_code")

el_strs <- merge(local, burger, by.x="AU2013", by.y="AU2013_code") %>%
  filter(!is.na(burgs)) %>%
  mutate(quantile = ntile(burgs, 5), colour= colour_steps[quantile]) %>%
  select(geometry, selector=dn_ql, cols=colour, value=burgs)

Qnum = 2
fivesteps = rev(c("very few", "few", "neutral", "many", "very many"))
statement= "number of burglaries"
top_of_graph(el_strs, "Mosgiel Taieri", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "East Coast", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Saddle Hill", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "South Dunedin", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Cargill", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Hills", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()

#####
## Feel safe in own neighbourhood vs number of burgarlies 
el_strs$reported <- 0
el_strs$reported[el_strs$selector == "Mosgiel Taieri"] <- 21
el_strs$reported[el_strs$selector == "East Coast"] <- 19
el_strs$reported[el_strs$selector == "Saddle Hill"] <- 20
el_strs$reported[el_strs$selector == "South Dunedin"] <- 38
el_strs$reported[el_strs$selector == "Cargill"] <- 36
el_strs$reported[el_strs$selector == "Hills"] <- 18
png(height=480, width = 640, filename = "crime2.png", res=72)
par(mar=c(5,5,4,2)+0.1)
plot(el_strs$reported, el_strs$value, col=el_strs$cols, pch=19,
     bty="n", xlab="Survey: feel unsafe after dark in neighbourhood (%)",
     ylab="NZ Police:\nnumber of reported burglaries",
     xlim=c(min(el_strs$reported)-5,max(el_strs$reported)+5),
     main="Reported felling unsafe at night vs\nnumber of burglaries")
labs <- el_strs %>% group_by(selector, reported) %>%
  summarise(height=5)
group2 <- c("Cargill", "South Dunedin")
labs$reported[!(labs$selector %in% group2)] <- labs$reported[!(labs$selector %in% group2)] -.5
labs$height[!(labs$selector %in% group2)] <- labs$height[!(labs$selector %in% group2)] +50
text(x=labs$reported,y=labs$height,labels=labs$selector,
     srt=90,pos=4, cex=1, offset=.7)
par(mar=old_par$mar)
dev.off()