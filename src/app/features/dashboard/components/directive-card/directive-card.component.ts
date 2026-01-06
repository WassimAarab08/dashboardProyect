import { Component, input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-directive-card',
  templateUrl: './directive-card.component.html',
})
export default class DirectiveCardComponent implements AfterViewInit {
  
  // Inputs
  title = input.required<string>();
  directiveName = input.required<string>();
  description = input.required<string>();
  themeColor = input.required<'purple' | 'sky' | 'orange'>();
  codeExample = input.required<string>();
  fileName = input.required<string>();
  footerLabel = input.required<string>();
  footerValue = input.required<string>();

  ngAfterViewInit() {
    import('highlight.js').then((hljs) => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.default.highlightElement(block as HTMLElement);
      });
    });
  }

  getThemeClasses() {
    const themes = {
      purple: {
        gradient: 'from-purple-600/20 via-blue-500/10 to-purple-600/20',
        icon: 'text-purple-400',
        bgGradient: 'from-purple-500/[0.02]',
        text: 'text-purple-500',
        dot: 'bg-purple-500/40',
        dotShadow: 'bg-purple-500/80 shadow-[0_0_4px_rgba(168,85,247,0.4)]',
      },
      sky: {
        gradient: 'from-sky-600/20 via-indigo-500/10 to-sky-600/20',
        icon: 'text-sky-400',
        bgGradient: 'from-sky-500/[0.02]',
        text: 'text-sky-500',
        dot: 'bg-sky-500/40',
        dotShadow: 'bg-sky-500/80 shadow-[0_0_4px_rgba(14,165,233,0.4)]',
      },
      orange: {
        gradient: 'from-orange-600/20 via-organe-500/10 to-orange-600/20',
        icon: 'text-orange-400',
        bgGradient: 'from-orange-500/[0.02]',
        text: 'text-orange-500',
        dot: 'bg-orange-500/40',
        dotShadow: 'bg-orange-500/80 shadow-[0_0_4px_rgba(249,115,22,0.4)]',
      },
    };
    return themes[this.themeColor()];
  }
}
