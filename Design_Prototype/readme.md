
# Design & Prototype Qualitative Assignment

After last week sketch review, I have decided to go forward with the 'tracking trash' idea. 
The goal of the visualization is to show where the waste we generated goes / how it gets disposed everyday. It is an idea that continues the exploration in SDG goal 12 which aligns with the previous project, ['Waste World'](https://chayanitoey.github.io/MajorStudio1/). 


For the design aesthetic, this project will use the same styleguide as previous project. 
See more at [Quantitatiive Project Repository](https://github.com/Chayanitoey/MajorStudio1/tree/Design%26Prototype)

![Photo Color Scheme](https://github.com/Chayanitoey/MajorStudio1/blob/a0411dfa969735e3400efb4b3742cfd20ed9ef73/Assets/Colors.png) 


## First Sketch
![First Sketch](https://github.com/Chayanitoey/MajorStudio1_Qualitative/blob/92f68713e3d89a5d5fb6cdd1fdec788738726932/Sketch/SketchQuali3.jpg) 


## Hi-fidelity Sketch 
There are total of 10 scenes in this prototype, the preferred dimension of screen is '1920 * 1080'   

![Hifi sketch](https://github.com/Chayanitoey/MajorStudio1_Qualitative/blob/e1c624666fc9ef4b72f6d6a96dcc16bf1c579451/Design_Prototype/Hifi.jpg) 

### Data Sets
- ![WasteJourney](https://github.com/Chayanitoey/MajorStudio1_Qualitative/blob/c3d15960a7fcf788388ebce6b72f66f159340053/Design_Prototype/Data_FlowsOfWaste.jpg)

 This infographic / flowchart shows a complex system of how waste usually being managed in a global scale. For this assignment, I will only focus on the center to the blue components due to data availability. 

As shown in figure 2.3, waste prevention starts with the reduced use of material resources in the production process. Once goods are consumed second-hand and remanufactured products can re-enter consumption streams or production processes. Material may also be re-used or recycled by producers directly in production processes. As goods are produced and consumed waste is generated, in which case it may be collected, treated, disposed, recovered or exported/imported either through waste management or illegal and uncontrolled activities. Waste may be exported for treatment and disposal rather than treated or disposed of in the country, and waste may be imported for treatment and disposal. Recovered waste provides secondary raw materials which flow back to production. Interaction between the (formal) waste management and uncontrolled and illegal waste activities can occur for example, with waste recovery from municipal disposal sites by uncontrolled waste pickers, which then re-enters the production processes.

- [Report from UNstats.org](https://github.com/Chayanitoey/MajorStudio1_Qualitative/blob/92f68713e3d89a5d5fb6cdd1fdec788738726932/Design_Prototype/MS_3.3.1_3.3.2_Waste.pdf) - Manual on the Basic Set of Environment Statistics of the FDES 2013,Generation and Management of Waste. The data from this report is used to create informative description on the waste management process. 
- [Municipal waste treatment (latest year)](https://github.com/Chayanitoey/MajorStudio1_Qualitative/blob/c3d15960a7fcf788388ebce6b72f66f159340053/Design_Prototype/Municipal%20waste%20treatment%20(latest%20year).xlsx)  

![image](https://github.com/Chayanitoey/MajorStudio1_Qualitative/blob/3c871e5a08f449a26abc1b1bea322db8f94039f8/Design_Prototype/DataExample.jpg)

This file is downloaded from https://unstats.un.org/unsd/envstats/qindicators.cshtml, we will be using the percentage of waste per country by treatment in the data visualization. 

## Design Prototype
[Link to prototype](https://www.figma.com/proto/iZpuN7po3fRje15Crstlfp/MajorStudio1--Qualitative-Project?page-id=1%3A15&node-id=22%3A6&viewport=228%2C625%2C0.36&scaling=contain&starting-point-node-id=22%3A6) 



## Coding Progress
planning to utilize d3.force's parameters as in this example on [Observable by Malik Koné](https://observablehq.com/@maliky/testing-the-d3-forces-parameters)


### Next steps :

- Working on scale bar corresponding with the amount of circles flowing in each nodes. 
- Working on scrolly telling components 
