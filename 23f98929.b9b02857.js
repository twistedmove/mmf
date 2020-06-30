(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{145:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return d}));var a=n(2),i=n(9),r=(n(0),n(167)),o={id:"checkpointing",title:"Tutorial: Understanding Checkpointing for Pretraining and Finetuning",sidebar_label:"Checkpointing"},l={id:"tutorials/checkpointing",title:"Tutorial: Understanding Checkpointing for Pretraining and Finetuning",description:"In this tutorial, we will learn about the different details around finetuning from pretrained models like loading from checkpoints, loading a model from the model zoo and doing validation/inference using finetuned models. We will walk-through the tutorial by training a Visual BERT model and train/validate on Hateful Memes dataset.",source:"@site/docs/tutorials/checkpointing.md",permalink:"/docs/tutorials/checkpointing",editUrl:"https://github.com/facebookresearch/mmf/edit/master/website/docs/tutorials/checkpointing.md",lastUpdatedBy:"Amanpreet Singh",lastUpdatedAt:1593555534,sidebar_label:"Checkpointing",sidebar:"docs",previous:{title:"Tutorial: Adding a model - Concat BERT",permalink:"/docs/tutorials/concat_bert"},next:{title:"Large Scale Hyperparameter Sweeps on Slurm",permalink:"/docs/tutorials/slurm"}},c=[{value:"Pre-requisites and installation",id:"pre-requisites-and-installation",children:[]},{value:"Finetuning from a pretrained model",id:"finetuning-from-a-pretrained-model",children:[]},{value:"Finetuning from a pretrained checkpoint",id:"finetuning-from-a-pretrained-checkpoint",children:[]},{value:"Resuming training",id:"resuming-training",children:[]},{value:"Running validation using the trained model",id:"running-validation-using-the-trained-model",children:[]},{value:"Generating predictions using the trained model",id:"generating-predictions-using-the-trained-model",children:[]}],s={rightToc:c};function d(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"In this tutorial, we will learn about the different details around finetuning from pretrained models like loading from checkpoints, loading a model from the model zoo and doing validation/inference using finetuned models. We will walk-through the tutorial by training a Visual BERT model and train/validate on Hateful Memes dataset."),Object(r.b)("h2",{id:"pre-requisites-and-installation"},"Pre-requisites and installation"),Object(r.b)("p",null,"Follow the prerequisites for installation and dataset ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebookresearch/mmf/tree/master/projects/hateful_memes#prerequisites"}),"here"),"."),Object(r.b)("h2",{id:"finetuning-from-a-pretrained-model"},"Finetuning from a pretrained model"),Object(r.b)("p",null,"VisualBERT model is pretrained on V+L multimodal data. We will use a pretrained model on COCO Captions. To begin finetuning our VisualBERT model we will load a model pretrained on COCO Captions and finetune that on Hateful Memes."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"mmf_run config=projects/visual_bert/configs/hateful_memes/from_coco.yaml \\\n    model=visual_bert \\\n    dataset=hateful_memes \\\n    run_type=train_val\n")),Object(r.b)("p",null,"The config file contains two important changes :"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"checkpoint:\n  resume_pretrained: true\n  resume_zoo: visual_bert.pretrained.coco\n")),Object(r.b)("p",null,"Here ",Object(r.b)("inlineCode",{parentName:"p"},"checkpoint.resume_pretrained")," specifies if we want to resume from a pretrained model using the pretrained state dict mappings defined in ",Object(r.b)("inlineCode",{parentName:"p"},"checkpoint.pretrained_state_mapping"),". ",Object(r.b)("inlineCode",{parentName:"p"},"checkpoint.resume_zoo")," specifies which pretrained model from our model zoo we want to use for this. In this case, we will use ",Object(r.b)("inlineCode",{parentName:"p"},"visual_bert.pretrained.coco"),"."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"checkpoint.pretrained_state_mapping")," specifies how a pretrained model will be loaded and mapped to which keys of the target model. We use it since we only want to load specific layers from the pretrained model. In the case of VisualBERT model, we want to load the pretrained ",Object(r.b)("inlineCode",{parentName:"p"},"bert")," layers. This is specified in our defaults.yaml:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"checkpoint:\n  pretrained_state_mapping:\n    model.bert: model.bert\n")),Object(r.b)("p",null,"This will ensure only the ",Object(r.b)("inlineCode",{parentName:"p"},"model.bert")," layers of the COCO pretrained model gets loaded."),Object(r.b)("p",null,"We can also use the default config for VisualBERT on hateful memes directly and override the pretrained options through ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://mmf.sh/docs/notes/configuration#command-line-dot-list-override"}),"command line args"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"mmf_run config=projects/visual_bert/configs/hateful_memes/defaults.yaml model=visual_bert dataset=hateful_memes \\\nrun_type=train_val checkpoint.resume_pretrained=True checkpoint.resume_zoo=visual_bert.pretrained.coco\n")),Object(r.b)("p",null,"After running the training our model will be saved in ",Object(r.b)("inlineCode",{parentName:"p"},"./save/<experiment_name>/visual_bert_final.pth"),". Replace ",Object(r.b)("inlineCode",{parentName:"p"},"./save")," with ",Object(r.b)("inlineCode",{parentName:"p"},"env.save_dir")," if overriden. This will be the directory structure:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"\u251c\u2500\u2500 best.ckpt\n\u251c\u2500\u2500 config.yaml\n\u251c\u2500\u2500 current.ckpt\n\u251c\u2500\u2500 logs\n\u251c\u2500\u2500 models\n\u251c\u2500\u2500 train.log\n\u251c\u2500\u2500 visual_bert_final.pth\n")),Object(r.b)("h2",{id:"finetuning-from-a-pretrained-checkpoint"},"Finetuning from a pretrained checkpoint"),Object(r.b)("p",null,"Instead of loading from the model zoo we can also load from a file:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"mmf_run config=projects/visual_bert/configs/hateful_memes/defaults.yaml \\\n    model=visual_bert \\\n    dataset=hateful_memes \\\n    run_type=train_val \\\n    checkpoint.resume_pretrained=True \\\n    checkpoint.resume_file=<path_to_your_pretrained_model>\n")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"checkpoint.resume_file")," can also be used when loading a model file for evaluation or generating predictions. We will see more example usage of this later."),Object(r.b)("h2",{id:"resuming-training"},"Resuming training"),Object(r.b)("p",null,"To resume the training in case it gets intterupted, run:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"mmf_run config=projects/visual_bert/configs/hateful_memes/defaults.yaml \\\n    model=visual_bert \\\n    dataset=hateful_memes \\\n    run_type=train_val \\\n    checkpoint.resume=True\n")),Object(r.b)("p",null,"When ",Object(r.b)("inlineCode",{parentName:"p"},"checkpoint.resume=True"),", MMF will try to load automatically the last saved checkpoint in the ",Object(r.b)("inlineCode",{parentName:"p"},"env.save_dir")," experiment folder ",Object(r.b)("inlineCode",{parentName:"p"},"current.ckpt"),"."),Object(r.b)("p",null,'Instead of the last saved checkpoint, we can also resume from the "best" checkpoint based on ',Object(r.b)("inlineCode",{parentName:"p"},"training.early_stop.criteria")," if enabled in the config. This can be achieved using ",Object(r.b)("inlineCode",{parentName:"p"},"checkpoint.resume_best=True"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"mmf_run config=projects/visual_bert/configs/hateful_memes/defaults.yaml \\\n    model=visual_bert \\\n    dataset=hateful_memes \\\n    run_type=train_val \\\n    checkpoint.resume=True \\\n    checkpoint.resume_best=True\n")),Object(r.b)("p",null,"In the config early stopping parameters are as follows:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"training:\n  early_stop:\n    # Criteria(loss or metric) to be monitored for early stopping\n    criteria: hateful_memes/roc_auc\n    # Whether the monitored criteria should be minimized\n    minimize: false\n")),Object(r.b)("h2",{id:"running-validation-using-the-trained-model"},"Running validation using the trained model"),Object(r.b)("p",null,"After we finish the training we will load the trained model for validation:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"mmf_run config=projects/visual_bert/configs/hateful_memes/defaults.yaml \\\n    model=visual_bert \\\n    dataset=hateful_memes \\\n    run_type=val \\\n    checkpoint.resume_file=<path_to_finetuned_model>\n")),Object(r.b)("p",null,"Note that here we specify ",Object(r.b)("inlineCode",{parentName:"p"},"run_type=val")," so that we are running only validation. We also use ",Object(r.b)("inlineCode",{parentName:"p"},"checkpoint.resume_file")," to load the trained model."),Object(r.b)("h2",{id:"generating-predictions-using-the-trained-model"},"Generating predictions using the trained model"),Object(r.b)("p",null,"We will next load the trained model to generate prediction results:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"mmf_predict config=projects/visual_bert/configs/hateful_memes/defaults.yaml \\\n    model=visual_bert \\\n    dataset=hateful_memes \\\n    run_type=test \\\n    checkpoint.resume_file=<path_to_finetuned_model>\n")),Object(r.b)("p",null,"This will generate a submission file in csv format that can be used for submission to the Hateful Memes challenge."))}d.isMDXComponent=!0},167:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return b}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),d=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=d(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},m=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=d(n),m=a,b=u["".concat(o,".").concat(m)]||u[m]||p[m]||r;return n?i.a.createElement(b,l(l({ref:t},s),{},{components:n})):i.a.createElement(b,l({ref:t},s))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<r;s++)o[s]=n[s];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);