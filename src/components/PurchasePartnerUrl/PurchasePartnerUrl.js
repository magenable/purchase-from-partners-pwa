import React, { useRef, useEffect } from 'react';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { ShoppingBag } from 'react-feather';
import Button from "@magento/venia-ui/lib/components/Button";
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './PurchasePartnerUrl.css';
import { getConfiguration } from '../../talons/getConfiguration';
import ReactGA from 'react-ga';

const PurchasePartnerUrl = props => {
    const urls = props.urls;
    if (urls.length === 0) {
        return props.children;
    }
    const {
        configuration,
        error,
        loading
    } = getConfiguration();
    const containerEl = useRef(null);
    const linksWrapperEl = useRef(null);

    useEffect(() => {
        const mouseLeaveHandler = () => {
            linksWrapperEl.current.classList.add(classes.hidden);
        };

        if (containerEl.current && linksWrapperEl.current) {
            containerEl.current.addEventListener('mouseleave', mouseLeaveHandler);
        }

        return () => {
            if (containerEl.current && linksWrapperEl.current) {
                containerEl.current.removeEventListener('mouseleave', mouseLeaveHandler);
            }
        }
    }, [configuration]);

    if (loading) {
        return <Button priority="high" type="button">Loading...</Button>;
    }
    if (error) {
        return props.children;
    }
    const defaultTitle = configuration.default_title;
    const showAllLinks = configuration.show_all_links;
    const openInNewTab = configuration.open_in_new_tab;
    const gaEnabled = configuration.ga_enabled;
    const gaAccount = configuration.ga_account;
    if (gaEnabled) {
        ReactGA.initialize(gaAccount);
    }
    const classes = mergeClasses(defaultClasses, props.classes);
    const icon = <Icon
        classes={{ icon: defaultClasses.icon }}
        src={ShoppingBag}
        attrs={{ width: 16 }} />;

    let buttons = urls.map((e, i) => {
        const onClickEvent = () => {
            if (gaEnabled) {
                ReactGA.event({
                    label: e.link,
                    value: props.productPrice,
                    category: e.event_category,
                    action: e.event_action
                });
            }

            if (openInNewTab) {
                window.open(e.link, '_blank').focus();
            } else {
                document.location = e.link;
            }
        };

        return (
            <Button key={i} priority="high" type="button" onClick={onClickEvent}>
                {icon}
                <span className={classes.text}>{e.link_title}</span>
            </Button>
        );
    });

    let result;
    if (showAllLinks || urls.length === 1) {
        result = buttons;
    } else {
        result = (<>
            <Button priority="high" type="button" onClick={(e) => {
                linksWrapperEl.current.classList.toggle(classes.hidden);
            }}>
                {icon}
                <span className={classes.text}>{defaultTitle}</span>
            </Button>
            <div className={classes.linksWrapper + ' ' + classes.hidden} ref={linksWrapperEl}>
                {buttons}
            </div>
        </>);
    }

    return (
        <div className={classes.container + (props.isGalleryItem ? ' ' + classes.galleryItem : '')} ref={containerEl}>
            {result}
        </div>
    );
};

export default PurchasePartnerUrl;
