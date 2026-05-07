export interface ResearchPaperSeed {
  title: string;
  authors: string[];
  publication_year: number;
  journal: string;
  doi: string;
  abstract: string;
  citation_count: number;
  keywords: string[];
}

const leadAuthors = ["A. Singh", "M. Chen", "L. O'Connor", "D. Garcia", "P. Kumar", "R. Johnson", "S. Tan", "E. Muller"];
const journals = ["Journal of Sustainable Computing", "Applied Energy Systems", "Cloud Infrastructure Review", "Water-Energy Nexus Letters", "Data Center Engineering"];
const topics = [
  "Water consumption analysis of hyperscale data centers in arid regions",
  "Carbon-aware workload shifting for low-emission cloud operations",
  "Cooling optimization under drought constraints",
  "Grid-responsive demand control in colocation facilities",
  "Life-cycle assessment of evaporative cooling retrofits",
  "Digital twin forecasting for data center utility demand",
  "AI-guided chiller sequencing for PUE reduction",
  "Regional climate risk mapping for cloud expansion planning"
];

function powerLawCitations(rank: number): number {
  return Math.max(1, Math.round(480 / Math.pow(rank + 1, 0.82)));
}

export const researchPapersSeed: ResearchPaperSeed[] = Array.from({ length: 100 }).map((_, idx) => {
  const topic = topics[idx % topics.length];
  const year = 2020 + (idx % 6);
  const title = `${topic} — multi-region study ${idx + 1}`;
  const authors = [
    leadAuthors[idx % leadAuthors.length],
    leadAuthors[(idx + 3) % leadAuthors.length],
    leadAuthors[(idx + 5) % leadAuthors.length],
  ];

  return {
    title,
    authors,
    publication_year: year,
    journal: journals[idx % journals.length],
    doi: `10.5555/sdc.${year}.${String(idx + 1).padStart(4, "0")}`,
    abstract: `This paper evaluates ${topic.toLowerCase()} with benchmark datasets from cloud and colocation portfolios.`,
    citation_count: powerLawCitations(idx),
    keywords: ["data centers", "sustainability", "water", "grid", "forecasting"],
  };
});
