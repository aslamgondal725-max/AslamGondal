---
title: "Engineering the Human Endosteal Niche: Reflections on the eVON Study"
date: "2026-02-22"
slug: "engineering-the-human-endosteal-niche-evon"
excerpt: "Reflections on the eVON organoid study: scaffold-assisted hiPSC vascularized osteoblastic niches, hematopoietic outcomes, and key open questions."
tags:
  - Bone marrow niche
  - Endosteal niche
  - Organoids
  - hiPSC
  - Hematopoiesis
paperTitle: "Macro-scale, scaffold-assisted model of the human bone marrow endosteal niche using hiPSC-vascularized osteoblastic organoids"
paperUrl: "https://www.sciencedirect.com/science/article/pii/S1934590925003777?via%3Dihub"
---

## Why this paper caught my attention

One of the enduring challenges in bone marrow biology is recreating the complexity of the human hematopoietic microenvironment *in vitro*. Bone is not merely a structural tissue; it is an active, dynamic organ composed of at least two functionally distinct yet deeply interconnected compartments:

- The **bone marrow niche**
- The **endosteal niche**

While many organoid-based studies focus on the marrow niche, the endosteal niche remains comparatively underexplored—despite its critical role in hematopoietic stem and progenitor cell (HSPC) maintenance, quiescence, and lineage decisions.

A particularly interesting contribution in this space is the study introducing engineered **Vascularised Osteoblastic Niches (eVONs)**.

---

## Conceptual design of the eVON model

The study’s objective was to reconstruct features of the human endosteal niche using a scaffold-assisted organoid strategy, combining two building blocks:

### 1) Osteogenic spheroids
Derived from human induced pluripotent stem cells (hiPSCs) via mesodermal induction, these spheroids were cultured on **hydroxyapatite-coated scaffolds**, mimicking the mineralized bone interface.

### 2) Vascular spheroids
Also generated from hiPSCs, vascular spheroids were seeded onto the osteogenic constructs after osteogenic maturation.

Following co-culture, the composite structures—termed **eVONs**—were maintained for seven days prior to characterization.  
For comparison, engineered **osteoblastic niches (eONs)** lacking vascular components served as controls.

---

## Hallmarks of an engineered endosteal niche

The eVON constructs displayed features associated with native endosteal biology:

- **CD31⁺ / CD34⁺** endothelial cells  
- **NG2⁺** pericytes  
- **OCN⁺** extracellular matrix  
- **CD271⁺ / CD146⁺** stromal populations  

Validated using:

- Flow cytometry  
- Immunofluorescence  
- Scanning electron microscopy (SEM)  

Structurally, the model captured key aspects of vascularized osteoblastic architecture.

---

## Hematopoietic outcomes: in vitro vs in vivo

After HSPC seeding, distinct lineage patterns emerged.

### In vitro observations

**Higher representation in eVONs**
- HSPCs  
- Multipotent progenitors (MPPs)  
- Myeloblasts  

**Higher representation in eONs**
- Megakaryocytes  
- Non-myeloid populations  

**Comparable across models**
- HSCs  
- Monocytes  
- Multi-lymphoid progenitors (MLPs)

### In vivo transplantation findings

When harvested HSPCs were transplanted into NSG mice:

- Myeloblasts remained higher in eVON-derived cells  
- B and T lymphocytes were higher in eON-derived cells  
- Monocytes and megakaryocytes were largely equivalent  

Transplantation largely reproduced expected differentiation capacity rather than showing strong niche-specific functional divergence.

---

## Points of methodological ambiguity

### 1) CD34 as a dual marker

CD34 was used:
- as an endothelial marker (Figure 1)  
- as a hematopoietic marker (Figure 2)  

In immunofluorescence analyses, CD34⁺ cells were interpreted as HSPCs without clear co-staining using lineage-specific hematopoietic markers. Distinguishing endothelial vs hematopoietic CD34⁺ cells would strengthen interpretability.

### 2) Relevance of short-term transplantation

HSPCs cultured for one week were harvested and transplanted. Conceptually this tests whether HSPCs retain function after brief in vitro residence. However:

- undifferentiated HSPCs would be expected to maintain engraftment capacity  
- no strong niche-dependent divergence was observed  

This primarily confirms baseline preservation rather than niche-specific modulation.

---

## CXCR4–CXCL12 signaling: a consistent finding

Disruption of CXCR4–CXCL12 signaling reduced HSPC numbers and increased differentiation. This aligns well with established hematopoietic biology and supports physiological relevance along this axis.

---

## Growth factor dependency: an open question

Exogenous supplementation with **SCF, TPO, and FLT3L** was required to sustain HSPCs. Yet endothelial and osteoblastic populations are known endogenous sources of these factors.

Single-cell RNA sequencing detected CXCL12 and SCF expression across multiple clusters, raising a key question:

**Why is external SCF still necessary if endogenous production exists?**

Notably:
- TPO expression was minimal, suggesting incomplete stromal maturation.

---

## Single-cell RNA sequencing: unexpected cell types

scRNA-seq revealed populations not initially characterized:

- Macrophage-like cells  
- Neural-like cells  
- Epithelial-like cells  

Immunostaining confirmed:
- **CD68⁺** macrophage-like cells near vasculature  
- **TH⁺** neural elements associated with vessels  

These findings are intriguing but mechanistically unexplored—especially regarding lineage origin and epithelial transitions.

---

## A more fundamental concern: osteogenic maturity

The osteogenic clusters showed predominantly early osteogenic markers, with **RUNX2** as the most advanced marker—yet RUNX2 is itself an early osteogenic regulator.

This contrasts with reported **osteocalcin (OCN)** protein expression, typically associated with later osteoblast differentiation. The discrepancy between RNA (immature) and protein (mature) raises interpretative questions.

Given that mature osteoblasts are central to HSPC maintenance and quiescence, limited osteogenic maturity may partially explain restricted long-term HSPC maintenance in vitro.

---

## Variability across iPSC lines

Replication across multiple iPSC lines showed:
- general reproducibility  
- expected variability, especially in endothelial networks  

A strength of the study: robustness while acknowledging biological heterogeneity.

---

## Future directions worth exploring

1) **Enhance osteogenic maturation**  
More mature osteogenic spheroids or longer maturation windows may clarify stromal support capacity.

2) **Improve immunophenotypic resolution**  
Explicit endothelial vs hematopoietic markers in imaging would reduce ambiguity.

3) **Mechanistic lineage tracking**  
Understanding emergence of neural/macrophage-like cells may reveal unexpected niche biology.

---

## Final thoughts

This is a technically elegant and experimentally accessible platform. Its scaffold-assisted, spheroid-based design appears straightforward to reproduce—an important advantage.

It’s best viewed not as a definitive reconstruction, but as a foundational framework.  
The unanswered questions aren’t weaknesses alone—they’re opportunities.

And in organoid biology, those opportunities often lead to the most interesting discoveries.
