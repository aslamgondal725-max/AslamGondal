---
title: "Engineering the Endosteal Niche: A Critical Analysis of the eVON Model"
date: "2026-02-22"
excerpt: "A deep dive into a new hiPSC-derived vascularized osteoblastic organoid system—and the questions it raises about faithfully mimicking bone marrow biology."
teaserQuestion: "What if the key to myeloid dominance in the eVON isn`t added signals-but missing osteogenic maturity?"
paperTitle: "Macro-scale, scaffold-assisted model of the human bone marrow endosteal niche using hiPSC-vascularized osteoblastic organoids"
paperUrl: "https://www.cell.com/cell-stem-cell/fulltext/S1934-5909(25)00377-7?_returnURL=https%3A%2F%2Flinkinghub.elsevier.com%2Fretrieve%2Fpii%2FS1934590925003777%3Fshowall%3Dtrue"
tags:
  - Organoids
  - BoneMarrow
  - HematopoieticStemCells
  - TissueEngineering
  - iPSC
  - EndostealNiche
  - Vascularization
  - SingleCellAnalysis
---

# Engineering the Endosteal Niche: A Critical Analysis of the eVON Model

*What if the key to myeloid dominance in the eVON isn`t added signals-but missing osteogenic maturity?*

## Introduction: The Niche Problem

The bone marrow microenvironment represents one of the most complex regulatory systems in human physiology. At its core lies a fundamental architectural division: the **endosteal niche** (lining the bone surface) and the **perivascular niche** (surrounding sinusoidal blood vessels). While previous organoid models have successfully captured aspects of the perivascular compartment, the endosteal niche—critical for hematopoietic stem cell (HSC) quiescence and long-term maintenance—has remained frustratingly elusive.

A recent study published in *Cell Stem Cell* introduces the engineered **Vascularized Osteoblastic Niche (eVON)**—a scaffold-based system combining hiPSC-derived osteogenic spheroids with vascular spheroids to model the human endosteal microenvironment. While this work represents a significant technical advance, it also raises important questions about developmental maturity, marker specificity, and translational relevance.

## The Technical Architecture: Building eVONs

The study's core innovation lies in its biphasic assembly strategy. Researchers first differentiated hiPSCs through mesodermal induction to generate osteogenic spheroids, which were cultured on hydroxyapatite-coated scaffolds to mimic bone mineral. In parallel, vascular spheroids were generated and subsequently layered atop the osteogenic constructs once mature. This co-culture system was maintained for seven days before characterization.

The resulting eVONs demonstrated several hallmark features of the endosteal niche:

- **CD31⁺CD34⁺** endothelial networks forming vascular structures  
- **NG2⁺** pericytes supporting vessel stability  
- **Osteocalcin (OCN)⁺** matrix deposition indicating osteogenic activity  
- **CD271⁺CD146⁺** stromal cells representing mesenchymal progenitors  

Control “engineered Osteoblastic Niches” (eONs) lacked vascular components, allowing direct comparison.

## Hematopoietic Support: Promise and Complexity

When hematopoietic stem and progenitor cells (HSPCs) were seeded into these constructs, the results revealed both the potential and limitations of the model.

In vitro, eVONs showed enhanced maintenance of **HSPCs, MPPs, and myeloblasts** compared to eONs, while **HSCs, MLPs, and monocytes** remained equivalent. Interestingly, **megakaryocytes and non-myeloid cells** were higher in the avascular eONs—a counterintuitive finding that warrants deeper investigation.

In vivo transplantation into immunodeficient NSG mice yielded more nuanced outcomes. Only **myeloblasts** showed eVON superiority, while lymphoid lineages (**B and T cells**) favored eON-derived cells. This suggests the vascular component may selectively support myeloid differentiation—a bias that could limit the model’s utility for studying complete hematopoiesis.

## Critical Concerns: Methodological Red Flags

### The CD34 Ambiguity

A major methodological concern is the study’s use of **CD34** as both an endothelial and hematopoietic marker without clear discrimination. CD34 identifies endothelial cells in vascular networks (Figure 1), but is also used to mark HSPCs (Figure 2). Without co-staining with hematopoietic markers (e.g., **CD45, CD38, lineage markers**), CD34⁺ cells near vessels cannot be conclusively identified as HSPCs rather than endothelial cells.

### The Maturity Paradox

Single-cell RNA-seq suggested osteogenic clusters expressed mostly early markers (**RUNX2**) with limited mature osteoblast signatures (e.g., **BGLAP**). This creates a tension: how do cells lacking mature osteoblast transcripts produce OCN⁺ protein detected by immunostaining?

Functionally, mature osteoblasts help maintain HSC quiescence via CXCL12/SCF and other factors. The need for exogenous cytokines (SCF, TPO, FLT3L) hints that resident niche cells may be immature or insufficient. If endothelial cells and osteoblasts are “present,” why is the niche not autonomously supportive beyond one week?

### Unexpected Cellular Contaminants: Biology or Artifact?

The single-cell dataset contained unexpected populations (macrophage-like, epithelial, neural). The authors validated neural (TH⁺) and macrophage (CD68⁺) markers, but did not investigate origins. This matters—these populations could reflect off-target differentiation or confound HSPC behavior.

### The Transplantation Paradox

The study demonstrates graft persistence in vivo, but if the goal is an in vitro model of hematopoiesis, in vivo survival is not the same as in vitro physiological fidelity. The field needs models that reduce animal dependence, not require implantation to demonstrate “functionality.”

## Strengths: What the Model Gets Right

Despite limitations, eVONs represent meaningful progress:

1. **Reproducibility across lines** (3 hiPSC lines)  
2. **CXCR4–CXCL12 axis** functionally validated  
3. **Endogenous VEGF signaling** supports angiogenesis  
4. **Scaffold-based format** improves accessibility and reproducibility

## The Path Forward: Recommendations

- **Enhance osteoblastic maturation** (longer differentiation, BMP2/Wnt tuning)  
- **Resolve marker ambiguity** (CD34 + CD45/CD38 for HSPCs; CD31/CD144 for endothelium)  
- **Investigate contaminants** (lineage tracing and differentiation trajectory checks)  
- **Extend in vitro maintenance** (aim 4–8 weeks without exogenous cytokines)  
- **Include lymphoid readouts** (IL-7, Notch ligands, optimized Flt3L)

## Conclusion: Incremental Progress in a Complex Landscape

The eVON model is a valuable—yet incomplete—step toward engineering the human endosteal niche. Reproducible architecture and vascular–osteoblastic co-culture are strengths, but osteogenic immaturity, marker ambiguity, and reliance on exogenous support highlight how far we remain from true physiological mimicry.

**What do you think?** Does the myeloid bias reflect a real property of the endosteal niche—or missing factors for lymphoid support?