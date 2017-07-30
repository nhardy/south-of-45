library(sf)
library(dplyr)
library(viridis)
## through trial and error, figured out which census area units match Quality Life data
mostaieri <- c(601302, 602200, 602300, 602411, 602412,
            602500, 602600, 606100, 606210, 606220, 606300)
waikpen <- c(601400,601500, 601602, 601603, 601604, 601605,604612,604620,
          604710, 604720, 604810, 604821, 604822, 604830, 604901, 604902, 605100, 605200)
cargill <- c(603210, 603220,603300, 603400, 603500, 603601,
             603601, 603602, 603000, 603100, 602900, 603810)
saddle <- c(601900, 602000, 602100, 602421, 602422, 605800, 605910, 605920)
southd <- c(602800, 604210, 604221, 604222, 604300, 604410, 604420,
            604500, 604611, 605400, 605500, 605600)
hills <- c(603930, 603910, 604010, 603920, 603820, 603720,
           603710, 604020, 604130, 604110, 604120)
dunedinAUs <- c(mostaieri, waikpen, cargill, saddle, southd, hills)

## File for matching meshblocks, Area Units, etc
concordance <- read.csv("2017_Areas_Table.txt", stringsAsFactors=FALSE)
concordance$dn_ql <- "outside"
concordance$dn_ql[concordance$AU2013_code %in% mostaieri] <- "Mosgiel Taieri"
concordance$dn_ql[concordance$AU2013_code %in% waikpen] <- "East Coast"
concordance$dn_ql[concordance$AU2013_code %in% cargill] <- "Cargill"
concordance$dn_ql[concordance$AU2013_code %in% saddle] <- "Saddle Hill"
concordance$dn_ql[concordance$AU2013_code %in% southd] <- "South Dunedin"
concordance$dn_ql[concordance$AU2013_code %in% hills] <- "Hills"
concordance <- concordance %>% filter(AU2013_code %in% dunedinAUs) %>%
  arrange(AU2013_code)

## shape files
path_shapes <- "ESRI\ Geodatabase\ Census\ Based\ 2013/2013\ Digital\ Boundaries\ Generalised\ Clipped.gdb"
nz_shapes <- st_read(path_shapes, layer="AU2013_GV_Clipped")
nz_shapes$AU2013 <- as.numeric(as.character(nz_shapes$AU2013))
local <- nz_shapes[nz_shapes$AU2013 %in% dunedinAUs,] 

# colour set
colour_steps <- c("#F8D700", "#F8B517", "#C3A465", "#9094B0", "#222E5F")
# store par
old_par <- par()

# match regions to areas and create a simplified map for SVG
AU_region <- concordance %>% select(AU2013_code, dn_ql) %>% distinct
simple_map <- merge(local, AU_region, by.x="AU2013", by.y="AU2013_code") %>% 
  select(dn_ql, geometry) %>% mutate(st_simplify(geometry, dTolerance = 200)) 
st_write(simple_map, "regional.geojson", delete_dsn=TRUE)

## Functions for submaps that share the same plan
top_of_graph <-function(x, region, question, statement, fivestep, fivecols){
  png(height=480, width = 640, filename = paste0(region,question,".png"), res=72)
  layout(mat=matrix(c(1,1,1,1,1,1,2,3,4), ncol=3))
  par(mar=c(1,1,1,1))
  plot(x$geometry[x$selector == region], 
       col=x$cols[x$selector == region], main="")
  plot(1:2,1:2,type="n", bty="n", axes=FALSE)
  text(1.5,1.5,labels=paste(region, "region\n", statement), cex=2)
  step <- (max(x$value, na.rm=TRUE) - min(x$value, na.rm=TRUE)) / 10
  x$roundval <- round(x$value / step) * step
  grf <- x %>% group_by(roundval) %>% mutate(height=1:n()) %>%
    ungroup() %>%
    mutate(cols = ifelse(selector == region,
                         cols, paste0(cols,"44"))) 
  plot(grf$roundval, grf$height, col=grf$cols, pch=15, cex=2.5, bty="n",
       main="Region in relation to city")
  par(mar=c(2,2,2,2))
  plot(1:2,1:2,type="n", bty="n", axes=FALSE)
  text(1.2,(1:5)/5+.95, fivestep, cex=1.6, pos=4)
  points(rep(1.1,5),(1:5)/5+.95,pch=15,cex=3, col=fivecols)
}

end_of_graph <-function(){
  dev.off()
  par(mar=old_par$mar)
}
